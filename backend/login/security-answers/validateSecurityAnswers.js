//https://xn2s5fwwbmnucawsewwwbrymxi0bwkio.lambda-url.us-east-1.on.aws/?userSub=60be4311-fd0d-4505-a80f-929698fce8f4&answer1=color&answer2=model&answer3=player
const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        const userSub = event.queryStringParameters.userSub;
        const answer1 = event.queryStringParameters.answer1;
        const answer2 = event.queryStringParameters.answer2;
        const answer3 = event.queryStringParameters.answer3;

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

        if (user.Item.answer1 === answer1
            && user.Item.answer2 === answer2
            && user.Item.answer3 === answer3) {
            response.body = JSON.stringify({ validated: true })
        } else {
            response.body = JSON.stringify({ validated: false })
        }
        return response;
    } catch (err) {
        return err;
    }
};