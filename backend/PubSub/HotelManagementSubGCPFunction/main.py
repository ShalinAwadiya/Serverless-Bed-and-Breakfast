import base64
from email import header
import json
import requests

from datetime import datetime

def updateBookingRecords(payload):
    try:   
        formData = {}
        print("PAYLOAD", payload)
        formData['customerId'] = payload['data']['data']['email']
        formData['roomType'] =  payload['data']['data']['RoomType']
        formData['price'] = payload['data']['data']['price']
        formData['bookingDate'] = payload['data']['data']['bookingDate']
        formData['bookingId'] = payload['data']['data']['bookingId']
        formData['bookingDayPeriod'] = payload['data']['data']['bookingDays']
        url = "https://us-east1-serverlessbb.cloudfunctions.net/updateBookingRecords"
        finalData = {"payload": formData}
        headers =  {"Content-Type":"application/json"}

        request = requests.post(url=url, headers=headers, data=json.dumps(finalData))
        print(request.json())
        return True

    except Exception as e:
        print(str(e))
        return False


def updateRevenueRecord(payload):
    try:
        formData = {}
        print("PAYLOAD 2", payload)
        formData['date'] = payload['data']['data']['bookingDate']
        formData['revenue'] = payload['data']['data']['price']

        url = "https://us-central1-serverlessbb.cloudfunctions.net/updateRevenueRecordv2"
        finalData = {"payload": formData}
        headers =  {"Content-Type":"application/json"}
        request = requests.post(url=url, headers=headers, data=json.dumps(finalData))
        return True  
    except Exception as e:
        return False


def updateAdminRecord(payload):
    try: 
        updateBookingRecords(payload)
        updateRevenueRecord(payload)
        return True
    except Exception as e:
        print(str(e))


def subscribe(event, context):
    pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    print(json.loads(pubsub_message))
    pubsub_message_json = json.loads(pubsub_message)
    
    headers =  {"Content-Type":"application/json"}
    # api-endpoint
    URL = "https://iyawnfwaxwngislds7cgsv3tye0xytpc.lambda-url.us-east-1.on.aws/"

    # sending post request and saving response as response object
    r = requests.post(url = URL, data = json.dumps(pubsub_message_json), headers=headers)
    updateAdminRecord(pubsub_message_json)

    print(r.text)
