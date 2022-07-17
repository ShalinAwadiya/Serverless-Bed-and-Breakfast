//Get all objects from breakfast table that has list of breakfast items
const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

const breakfastParams = {
    TableName: "breakfast",
};

exports.handler = async (event) => {
    try {
        const data = await listItems();
        return data;
    } catch (err) {
        return { error: err };
    }
};

async function listItems() {
    try {
        const breakfastItems = await dynamoClient.scan(breakfastParams).promise();
        console.log('Breakfast: ', breakfastItems);

        return breakfastItems;
    } catch (err) {
        return err;
    }
}
