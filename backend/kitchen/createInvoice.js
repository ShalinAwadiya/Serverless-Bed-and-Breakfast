//Add breakfast food items to the cart
const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {

    console.log(event);

    const request = JSON.parse(event.body);
    console.log({ request });

    const invoiceParams = {
        TableName: "food_invoices",
        Item: {
            Id: request.Id,
            email: request.email,
            userSub: request.userSub,
            food: request.food,
            totalPrice: request.totalPrice,
            date: Date.now()
        }
    };

    const response = await dynamoClient
        .put(invoiceParams)
        .promise()
        .then((data) => {
            console.info("Invoice added in food_invoices table: ", data);
            const response = {
                statusCode: 200
            };
            response.body = JSON.stringify({ message: 'Created invoice successfully' });
            return response;
        })
        .catch((err) => {
            console.info("Error: ", err);
        });
    return response;
};