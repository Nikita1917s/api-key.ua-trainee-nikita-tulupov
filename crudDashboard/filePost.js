'use strict';
const AWS = require('aws-sdk');
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const filePost = async (event) => {
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    let responseBody = '';
    let url = ''
    let statusCode = 0;
    const allowedMimes = ['image/jpeg', 'image/JPEG', 'image/png', 'image/PNG', 'image/jpg', 'image/JPG', 'image/gif', 'image/GIF',];

    const { fileId, file, fileType } = event.body;

    let newFile = file;
    if (newFile.substr(0, 7) === 'base64,') {
        newFile = newFile.substr(7, newFile.length);
    }
    const buffer = Buffer.from(newFile, 'base64');

    const params = {
        Bucket: 'trello-nikita-files',
        Key: fileId,
        Body: buffer,
    };

    if (allowedMimes.includes(fileType)) {
        try {
            const data = await s3.upload(params).promise();
            responseBody = `https://trello-nikita-files.s3.us-east-2.amazonaws.com/${fileId}`;
            statusCode = 201;
            url = data;
        } catch (err) {
            statusCode = 403;
            responseBody = `Unable to put items: ${err}`;
        };
    } else {
        statusCode = 403;
        responseBody = `File type is not allowed ${fileType} \nYou can upload next file types: ${allowedMimes.join(' ')}`;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "multipart/form-data",
            "access-control-allow-origin": "*"
        },
        body: responseBody
    };
    return response;
};

module.exports = {
    handler: middy(filePost).use(httpJsonBodyParser())
}