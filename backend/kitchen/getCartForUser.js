//Add breakfast food items to the cart
const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const userSub = event.queryStringParameters.userSub;
    console.log({ userSub });

    const cart = {
        TableName: "food_cart",
        Key: {
            userSub: userSub,
        }
    }; 

    const fetchedCartDetails = await dynamoClient.get(cart).promise();
    console.log({ fetchedCartDetails });

    return fetchedCartDetails;
}