const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const userSub = event.queryStringParameters.userSub;
    console.log({ userSub });

    const cartParams = {
        TableName: "food_cart",
        Key: {
            userSub: userSub
        }
    };

    try {
        await dynamoClient.delete(cartParams).promise();
        const response = {
            statusCode: 200,
        };
        response.body = JSON.stringify({ message: 'Cart checked out successfully' });
        return response;
    } catch (err) {
        console.log(err)
    }
};
