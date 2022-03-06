'use strict';
const faceApi = require('@vladmandic/face-api');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');
const log = require('@vladmandic/pilogger');

const ssdOptions = { minConfidence: 0.1, maxResults: 10 };
const optionsSSDMobileNet = new faceApi.SsdMobilenetv1Options(ssdOptions);

function print(face) {
    const expression = Object.entries(face.expressions).reduce((acc, val) => ((val[1] > acc[1]) ? val : acc), ['', 0]);
    const box = [face.alignedRect._box._x, face.alignedRect._box._y, face.alignedRect._box._width, face.alignedRect._box._height];
    const gender = `Gender: ${Math.round(100 * face.genderProbability)}% ${face.gender}`;
    log.data(`Detection confidence: ${Math.round(100 * face.detection._score)}% ${gender} Age: ${Math.round(10 * face.age) / 10} Expression: ${Math.round(100 * expression[1])}% ${expression[0]} Box: ${box.map((a) => Math.round(a))}`);
}

const detectFace = async (req, res, next) => {
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

        await faceApi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, '../weights'));
        await faceApi.nets.faceExpressionNet.loadFromDisk(path.join(__dirname, '../weights'));
        await faceApi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname, '../weights'));
        await faceApi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, '../weights'));
        await faceApi.nets.ageGenderNet.loadFromDisk(path.join(__dirname, '../weights'));

        const results = await faceApi.detectAllFaces(tensor, optionsSSDMobileNet)
            .withFaceLandmarks()
            .withFaceExpressions();
            
        for (const face of results) print(face);

        fs.unlinkSync(fileName);
        return res.json({ status: 200, image: results });
    } catch (error) {
        const message = 'Error detecting user facial expressions, please try again. \n' + error;
        return res.json({ status: 400, message: message });
    }
}

module.exports = {
    detectFace
}