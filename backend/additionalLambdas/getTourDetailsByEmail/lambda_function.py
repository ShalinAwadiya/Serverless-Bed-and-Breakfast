import json
import boto3
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, Decimal):
      return str(obj)
    return json.JSONEncoder.default(self, obj)

email = None

dynamodb = boto3.resource('dynamodb')


def getTourDetails(email):
    try:
        tourBookingDetails = "tourBookingDetails"
        
        tableTourBooking = dynamodb.Table(tourBookingDetails)
    
        tourResponse = tableTourBooking.query(
            IndexName='email-index',
            KeyConditionExpression=Key('email').eq(email)
        )
        
        print(tourResponse)
        return json.dumps({"data": tourResponse['Items']}, cls=DecimalEncoder)
    except Exception as e:
        return str(e)


def lambda_handler(event, context):
    global email
    try:
        print("EVENT", event)
        print("CONTEXT", context)
        email = event['queryStringParameters']['email']
        return {
            'statusCode': 200,
            'body': getTourDetails(email),
        }

    except Exception as e:
        return {
            'statusCode': 400,
            'error': str(e)
        }
