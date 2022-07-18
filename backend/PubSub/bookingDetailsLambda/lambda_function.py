import json
import os
import logging
import boto3
import time
import datetime
from datetime import timedelta
import random


AWS_REGION = 'us-east-1'
DB_TABLE_NAME = 'bookingDetails'
DB_TABLE_NAME_NOTIFICATION = 'notificationDetails'
DB_TABLE_NAME_V2 = 'BookingDetailsv2'


DYNAMODB_CLIENT = boto3.resource('dynamodb', region_name=AWS_REGION)
DYNAMODB_TABLE = DYNAMODB_CLIENT.Table(DB_TABLE_NAME)
DYNAMODB_TABLE_V2 = DYNAMODB_CLIENT.Table(DB_TABLE_NAME_V2)
DYNAMODB_TABLE_NOTIFICATION = DYNAMODB_CLIENT.Table(DB_TABLE_NAME_NOTIFICATION)

def makeDate(StartDate, NoDays):
    startDateObj = datetime.datetime.strptime(StartDate, '%m-%d-%Y').date()
    #print(startDateObj)
    dates = []
    currentDate = startDateObj
    for i in range(NoDays):
        dates.append(currentDate)
        currentDate += datetime.timedelta(days = 1)
    #print(dates)
    dates_in_string=[]
    for i in range(len(dates)):
        date = dates[i]
        date_in_string=""
        if len(str(date.day)) == 1:
            date_in_string = "0"+str(date.day)
        else:
            date_in_string=str(date.day)
        #print(date_in_string)
        if len(str(date.month)) == 1:
            date_in_string = date_in_string+ "0"+str(date.month)
        else:
            date_in_string=date_in_string+str(date.month)
            
        date_in_string=date_in_string+str(date.year)
        #print(date_in_string)
        dates_in_string.append(date_in_string)
    return dates_in_string

def lambda_handler(event, context):
    try:
        data = json.loads(event['body'])
        data = data['data']
        message = data['message']
        payload_notification = {
            'bookingId': data['data']['bookingId'],
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
        
        
        bookingDate = datetime.datetime.strptime(data['data']['bookingDate'], '%d-%m-%Y').strftime('%m-%d-%Y')
    
        datesBookingDone = makeDate(bookingDate,data['data']['bookingDays'])
        for date in datesBookingDone:
            bookingDetailsV2Payload = {
                'BookingId': random.randint(1000, 10000),
                'BookingDate': date,
                'Email': data['data']['email'],
                'Price': data['data']['price'],
                'RoomId': data['data']['roomNo']
            }
            DYNAMODB_TABLE_V2.put_item(
                Item=bookingDetailsV2Payload
            )
        return {
        'statusCode': 200,
        'body': json.dumps("Stored in DynamoDB")
        }
        
    except Exception as e:
        print(e)
        return {
        'statusCode': 400,
        'body': json.dumps(str(e))
        }
    

