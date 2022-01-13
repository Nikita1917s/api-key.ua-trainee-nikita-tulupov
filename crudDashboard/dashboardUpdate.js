'use strict';
import AWS from 'aws-sdk';

export async function handler(event, context) {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = '';
    let statusCode = 0;

    const { dashBoardId, columns } = JSON.parse(event.body);

    const params = {
        TableName: 'nikita-trello-db',
        Key: {
            dashBoardId: dashBoardId
        },
        UpdateExpression: 'set columns = :c',
        ExpressionAttributeValues: {
            ":c": columns
        },
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err) {
        responseBody = `Unable to updat e items: ${err}`
        statusCode = 403;
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