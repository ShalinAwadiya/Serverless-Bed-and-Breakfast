import json
import boto3
import random

def lambda_handler(event, context):
    print(event)
    data=json.loads(event['body'])
    
    userSub = data['userSub']
    email = data['email']
    answer1 = data['answer1']
    answer2 = data['answer2']
    answer3 = data['answer3']
   
    
    dynamodb = boto3.resource('dynamodb')   
    table = dynamodb.Table('users')
    
    response = table.get_item(Key={'userSub': userSub}) 
    if 'Item' in response:       
        print('User details already present.')
    else:                       
        putresponse = table.put_item(
        Item = { 
            'userSub': userSub,
            'email': email,
            'answer1': answer1,
            'answer2': answer2,
            'answer3': answer3
        })
        print(putresponse)
