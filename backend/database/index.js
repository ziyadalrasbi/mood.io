import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { applicationDefault } from 'firebase-admin/app';
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url);
const serviceAccount = require('./service-account.json');
import * as faceApi from 'face-api.js';
import { canvas } from '../detection/commons/Env.js';
import { faceDetectionNet, faceDetectionOptions } from '../detection/commons/FaceDetection.js';


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

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../web/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

  app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/createToken", function(req, res) {
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount)  });
    var id = req.body.id;
    admin.auth().createCustomToken(id)
    .then((customToken) => {
        res.json({token: customToken});
    })
    .catch((error) => {
        console.log('Error creating the token, please try again. \n' + error);
        throw error;
    })
})

app.post("/signIn", function(req, res) {
    fbApp.auth().signInWithCustomToken(JSON.stringify(req.body.token))
    .then((userCredential) => {
        var user = userCredential.user;
        res.json({user: user});
    })
    .catch((error) => {
        console.log('Error signing in user for the first time, please try again. \n' + error);
        throw error;
    })
})

app.post("/initUser", function(req, res) {
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

app.post("/detectFace", async function(req, res) {
    await faceDetectionNet.loadFromDisk(path.join(__dirname, '../detection/weights'));
    await faceApi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, '../detection/weights'));
    await faceApi.nets.faceExpressionNet.loadFromDisk(path.join(__dirname, '../detection/weights'));
    
    const img = await canvas.loadImage(req.body.img);
    const results = await faceApi.detectAllFaces(img, faceDetectionOptions)
    .withFaceLandmarks()
    .withFaceExpressions()

    const out = faceApi.createCanvasFromMedia(img);
    faceApi.draw.drawDetections(out, results.map(res => results.detection));
    faceApi.draw.drawFaceExpressions(out, results);

    res.json({ image: out.toBuffer('image/jpeg') });
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
