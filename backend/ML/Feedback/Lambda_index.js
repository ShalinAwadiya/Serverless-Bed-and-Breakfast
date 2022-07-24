const API_KEY = "AIzaSyA2x1gMAjFq6FODQH11_CcQ26qy-S3QbjQ";
const axios = require("axios").default;
const AWS = require('aws-sdk');
var uuid = require('uuid');

AWS.config.update({region:'us-east-1'});
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let polarity="Neutral";
    let feedback=JSON.parse(event.body).feedback;
    let userId=JSON.parse(event.body).userId;
    const payload = {
    document: {
      type: "PLAIN_TEXT",
      content: feedback,
    },
    encodingType: "UTF8",
  };
  
  await axios({
    method: "post",
    url: `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`,
    data: payload,
  }).then(function (response) {
    console.log(response.data.documentSentiment.score);
    let score=response.data.documentSentiment.score;
    if(score==0)
    {
        polarity="Neutral";
    }
    else if(score>0){
        polarity="Positive";
    }
    else{
        polarity="Negative";
    }
  });
  
    const params = {
        TableName : 'feedback_polarity',
        Item: {
            feedbackId:"feedback-"+uuid.v4(),
            userId: userId,
            polarity: polarity,
            feedback:feedback
        }
      }
     await docClient.put(params).promise()
    .then((data) => {
        console.info('successfully update to dynamodb', data)
    })
    .catch((err) => {
        console.info('failed adding data dynamodb', err)
    });

    const response = {
        statusCode: 200,
        body: "Feedback successfully submitted"
    };
    return response;
};

