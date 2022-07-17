import json
import os
import logging
import boto3
import time

AWS_REGION = 'us-east-1'
DB_TABLE_NAME = 'tourBookingDetails'
DB_TABLE_NAME_NOTIFICATION = 'tourNotificationDetails'

DYNAMODB_CLIENT = boto3.resource('dynamodb', region_name=AWS_REGION)
DYNAMODB_TABLE = DYNAMODB_CLIENT.Table(DB_TABLE_NAME)
DYNAMODB_TABLE_NOTIFICATION = DYNAMODB_CLIENT.Table(DB_TABLE_NAME_NOTIFICATION)

def lambda_handler(event, context):
    try:
        print(event)
        data = json.loads(event['body'])
        print(data)
        data = data['data']
        message = data['message']
        payload_notification = {
            'email': data['data']['email'],
            'message': message,
            'bookingDetails':data['data'],
            'timeStamp': str(time.time())
        }
        DYNAMODB_TABLE_NOTIFICATION.put_item(
            Item=payload_notification
        )
        DYNAMODB_TABLE.put_item(
        Item=data['data']
        )
        return {
        'statusCode': 200,
        'body': json.dumps("Stored in DynamoDB")
        }
        
    except Exception as e:
        return {
        'statusCode': 400,
        'body': json.dumps(str(e))
        }
    

