'use strict';
const AWS = require('aws-sdk');
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const dashboardDelete = async (event) => {
    const DynamoDB = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let statusCode = 0;

    const { dashboardId } = event.body;

    const params = {
        TableName: 'nikita-trello-dashboards',
        Key: {
            dashboardId: dashboardId
        }
    };

    try {
        const data = await DynamoDB.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err) {
        responseBody = `Unable to delete items: ${err}`;
    };

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*"
        },
        body: responseBody
    };

    return response;
};

module.exports = {
    handler: middy(dashboardDelete).use(httpJsonBodyParser())
};