//Add breakfast food items to the cart
const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const request = JSON.parse(event.body);
    console.log({ request });
    const response = await createInvoice(request);
    return response;
};

const deleteCart = async (userSub) => {
    const cartParams = {
        TableName: "food_cart",
        Key: {
            userSub: userSub
        }
    };
    try {
        await dynamoClient.delete(cartParams).promise();
    } catch (err) {
        console.log(err)
    }
}

const createInvoice = async (request) => {
    try {
        const invoiceParams = {
            TableName: "food_invoices",
            Item: {
                Id: request.Id,
                email: request.email,
                userSub: request.userSub,
                food: request.food,
                totalPrice: request.totalPrice,
                date: new Date(Date.now()).toLocaleString('en-US', { timeZone: 'America/Halifax' })
            }
        };
        const data = await dynamoClient.put(invoiceParams).promise();
        if (data) {
            console.info("Invoice added in food_invoices table: ", data);
            await deleteCart(request.userSub);

            const response = {
                statusCode: 200
            };
            response.body = JSON.stringify({ message: 'Invoice created successfully' });
            return response;
        }
    } catch (err) {
        console.log(err);
    }
}