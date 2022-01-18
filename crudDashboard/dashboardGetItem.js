'use strict';
const AWS = require('aws-sdk');

const dashboardGetItem = async (event) => {
    const DynamoDB = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let statusCode = 0;

    const { dashboardId } = event.pathParameters;

    const params = {
        TableName: 'nikita-trello-dashboards',
        Key: {
            dashboardId: dashboardId
        }
    };

    try {
        const data = await DynamoDB.get(params).promise();
        responseBody = JSON.stringify(data.Item);
        statusCode = 200;
    } catch (err) {
        statusCode = 403;
        responseBody = `Unable to get items: ${err}`;
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
    handler: dashboardGetItem
};