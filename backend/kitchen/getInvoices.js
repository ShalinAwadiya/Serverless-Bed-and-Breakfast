const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    const invoiceParams = {
        TableName: "food_invoices"
    };

    try {
        const invoices = await dynamoClient.scan(invoiceParams).promise();
        console.log({ invoices });

        return invoices;
    } catch (err) {
        return { error: err };
    }
};