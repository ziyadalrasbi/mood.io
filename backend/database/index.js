import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { applicationDefault } from 'firebase-admin/app';
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url);
const serviceAccount = require('./service-account.json');
import * as faceApi from '@vladmandic/face-api';
import { canvas } from '../detection/commons/Env.js';
// import { faceDetectionNet, faceDetectionOptions } from '../detection/commons/FaceDetection.js';

import tf from '@tensorflow/tfjs-node';
import '@tensorflow/tfjs-node';
// const faceApi = require('@vladmandic/face-api');
// const tf = require('@tensorflow/tfjs');
// require('@tensorflow/tfjs-node');
const fs = require('fs');


const PORT = process.env.PORT || 19001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors());
app.use(express.static(__dirname));


const firebaseConfig = {
    apiKey: "AIzaSyD2bHyYmGh6PtM76lj-4FZu-EwWNRHtUTI",
    authDomain: "mood-io-be1cc.firebaseapp.com",
    projectId: "mood-io-be1cc",
    storageBucket: "mood-io-be1cc.appspot.com",
    messagingSenderId: "159561548589",
    appId: "1:159561548589:web:9148d9531100bcc6d609a4",
    measurementId: "G-R0QQ53XLDE"
};

const fbApp = firebase.initializeApp(firebaseConfig);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../web/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.post("/createToken", function (req, res) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    var id = req.body.id;
    admin.auth().createCustomToken(id)
        .then((customToken) => {
            res.json({ token: customToken });
        })
        .catch((error) => {
            console.log('Error creating the token, please try again. \n' + error);
            throw error;
        })
})

app.post("/signIn", function (req, res) {
    fbApp.auth().signInWithCustomToken(JSON.stringify(req.body.token))
        .then((userCredential) => {
            var user = userCredential.user;
            res.json({ user: user });
        })
        .catch((error) => {
            console.log('Error signing in user for the first time, please try again. \n' + error);
            throw error;
        })
})

app.post("/initUser", function (req, res) {
    const response = fbApp.firestore().collection('users').doc(JSON.stringify(req.body.user));
    response.set({
        username: JSON.stringify(req.body.user),
        refreshToken: JSON.stringify(req.body.refreshToken)
    })
        .catch((error) => {
            console.log('Error initializing the user for the first time, please try again. \n' + error);
            throw error;
        })
    res.send('Operation completed');
})

app.post("/uploadImage", function (req, res) {
    var storageRef = fbApp.storage().ref('images/' + req.body.uri);
    var message = req.body.base64;
    storageRef.putString(message, 'base64')
        .then((snapshot) => {

        });
})

app.post("/downloadImage", function (req, res) {
    fbApp.storage().ref().child('images/' + req.body.uri).getDownloadURL()
        .then((url) => {

        })
})

const ssdOptions = { minConfidence: 0.1, maxResults: 10 };
const optionsSSDMobileNet = new faceApi.SsdMobilenetv1Options(ssdOptions);

app.post("/detectFace", async function (req, res) {
    try {
    var bitmap = new Buffer.from(req.body.base64, 'base64');
    const fileName = 'img_' + Math.random(5000) + '.jpg';
    const image = fs.writeFileSync(fileName, bitmap);
    var buffer = fs.readFileSync(fileName);
    const tensor = tf.tidy(() => {
        const decode = faceApi.tf.node.decodeImage(buffer, 3)
        let expand;
        if (decode.shape[2] == 4) {
            const channels = faceApi.tf.split(decode, 4, 2);
            const rgb = faceApi.tf.stack([channels[0], channels[1], channels[2]], 2);
            expand = faceApi.tf.reshape(rgb, [1, decode.shape[0], decode.shape[1], 3]);
        } else {
            expand = faceApi.tf.expandDims(decode, 0);
        }
        const cast = faceApi.tf.cast(expand, 'float32');
        return cast;
    })

    await faceApi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, '../detection/weights'));
    await faceApi.nets.faceExpressionNet.loadFromDisk(path.join(__dirname, '../detection/weights'));
    await faceApi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname, '../detection/weights'));
    await faceApi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, '../detection/weights'));
    await faceApi.nets.ageGenderNet.loadFromDisk(path.join(__dirname, '../detection/weights'));

    
    const results = await faceApi.detectAllFaces(tensor, optionsSSDMobileNet)
        .withFaceLandmarks()
        .withFaceExpressions();

    fs.unlinkSync(fileName);

    res.json({ image: results });
    } catch(error) {
        console.log(error);
        throw error;
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
