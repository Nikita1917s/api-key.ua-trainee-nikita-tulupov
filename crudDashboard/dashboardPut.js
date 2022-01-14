'use strict';
const AWS = require('aws-sdk');
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const dashboardPut = async (event) => {

    const DynamoDB = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let statusCode = 0;

    const { dashboardId, columns } = event.body;

    const params = {
        TableName: 'nikita-trello-dashboards',
        Item: {
            dashboardId: dashboardId,
            columns: columns
        }
    };

    try {
        const data = await DynamoDB.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
        statusCode = 403;
        responseBody = `Unable to put items: ${err}`;
    };

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    };
    return response;
};

module.exports = {
    handler: middy(dashboardPut).use(httpJsonBodyParser())
}