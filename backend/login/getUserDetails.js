//URL: https://if6wu4j6w5xpze4gvg64j3sdt40oictb.lambda-url.us-east-1.on.aws?userSub=7a36844d-03a5-4cd1-a747-932b3bb8b611
const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    try {
        const userSub = event.queryStringParameters.userSub;
        console.log(userSub);

        const userParams = {
            TableName: "users",
            Key: {
                userSub: userSub
            }
        };

        const user = await dynamoClient.get(userParams).promise();
        console.log('User Details by userSub: ', user)

        const response = {
            statusCode: 200,
            body: JSON.stringify({ user: user }),
        };
        return response;
    } catch (err) {
        return err;
    }
};