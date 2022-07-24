import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    
    body = json.loads(event['body'])
    tour_duration=int(body['days'])
    
    packages=getTourPackages(tour_duration)
    # print(tours)
    return {
        'statusCode': 200,
        'body': packages
    }

def getTourPackages(days):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('tour_package') 
    response = table.scan(FilterExpression=Attr("No_of_days").eq(days))
    data = response['Items']
    
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
        
    return data
    # print(data)          
    # if 'Items' in data:
    #     print(data['Items'][0])