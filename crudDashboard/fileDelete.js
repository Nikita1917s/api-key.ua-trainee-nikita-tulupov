'use strict';
const AWS = require('aws-sdk');
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const fileDelete = async (event) => {
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    let responseBody = '';
    let url = ''
    let statusCode = 0;

    const { imageArr } = event.body;

    const params = {
        Bucket: 'trello-nikita-files',
        Delete: {
            Objects: imageArr,
            Quiet: false
        }
    };

    console.log(111, event.body)

        try {
            const data = await s3.deleteObjects(params).promise();
            responseBody = JSON.stringify(data);
            statusCode = 201;
            url = data;
        } catch (err) {
            statusCode = 403;
            responseBody = `Unable to put items: ${err}`;
        };

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
    handler: middy(fileDelete).use(httpJsonBodyParser())
}