import json
import boto3
import random

def lambda_handler(event, context):
    print(event)
    data=json.loads(event['body'])
    
    email=data['email']
    ans1=data['ans1']
    ans2=data['ans2']
    ans3=data['ans3']
    key=random.randint(1,25)
    print(key)
    
    dynamodb = boto3.resource('dynamodb')   
    table = dynamodb.Table('Users')
    
    response = table.get_item(Key={'email': email}) 
    if 'Item' in response:       
        print('User details already present.')
    else:                       
        putresponse = table.put_item(
        Item = { 
            'email': email,
            'ans1': ans1,
            'ans2': ans2,
            'ans3': ans3,
            'key': key
             })
        print(putresponse)  
    print("hello from lambda");
