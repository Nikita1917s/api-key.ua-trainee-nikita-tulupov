'use strict';
import AWS from 'aws-sdk';

export async function handler(event, context) {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let statusCode = 0;

    const { userId } = event.pathParameters

    const params = {
        TableName: 'nikita-trello-db',
        Key: {
            userId: userId
        }
    };

    try {
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err) {
        responseBody = `Unable to delete items: ${err}`;
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