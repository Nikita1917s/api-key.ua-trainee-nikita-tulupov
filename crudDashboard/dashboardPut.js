'use strict';
// import AWS from 'aws-sdk';
const AWS = require('aws-sdk')

// export async function handler(event)
// const dashboardPut = async (event) => {
const dashboardPut = async (event) => {

    const DynamoDB = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let statusCode = 0;

    const { dashBoardId, columns } = JSON.parse(event.body);

    const params = {
        TableName: 'nikita-trello-db',
        Item: {
            dashBoardId: dashBoardId,
            columns: columns
        }
    };

    try {
        const data = await DynamoDB.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (err) {
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

module.exports = {
    dashboardPut
}