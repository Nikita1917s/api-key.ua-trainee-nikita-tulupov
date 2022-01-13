'use strict';
// import AWS from 'aws-sdk';
const AWS = require('aws-sdk')

// export async function handler(event)
// const dashboardPut = async (event) => {
    export async function handler(event) {

    const DynamoDB = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let statusCode = 0;

    const { dashboardId, columns } = JSON.parse(event.body);

    const params = {
        TableName: 'nikita-trello-dashboards',
        Item: {
            dashboardId: '123',
            columns: [{id:1, cards: [{card: 'new'}]}]
        }
        // Item: {
        //     dashboardId: dashboardId,
        //     columns: columns
        // }
    };

    try {
        const data = await DynamoDB.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
        statusCode = 403;
        responseBody = `Unable to put items: ${err}`
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