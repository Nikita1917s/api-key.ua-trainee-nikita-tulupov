'use strict';
const AWS = require('aws-sdk')

const dashboardGet = async (event) => {
    const DynamoDB = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let statusCode = 0;

    const params = {
        TableName: 'nikita-trello-dashboards',
    };

    try {
        const data = await DynamoDB.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    } catch (err) {
        statusCode = 403;
        responseBody = `Unable to get items: ${err}`;
    };

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };

    return response;
};

module.exports = {
    handler: dashboardGet
}