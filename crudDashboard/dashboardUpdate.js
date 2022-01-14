'use strict';
const AWS = require('aws-sdk');
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const dashboardUpdate = async (event) => {
    const DynamoDB = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let statusCode = 0;

    const { dashboardId, dashboardName, columns } = event.body;

    const params = {
        TableName: 'nikita-trello-dashboards',
        Key: {
            dashboardId: dashboardId
        },
        UpdateExpression: "SET #col = :n, dashboardName = :p",
        ExpressionAttributeNames: {
            "#col": "columns"
        },
        ExpressionAttributeValues: {
            ":n": columns,
            "p:": dashboardName
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const data = await DynamoDB.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err) {
        responseBody = `Unable to update items: ${err}`
        statusCode = 403;
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
    handler: middy(dashboardUpdate).use(httpJsonBodyParser())
};