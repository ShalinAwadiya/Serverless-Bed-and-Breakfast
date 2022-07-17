import base64
from email import header
import json
import requests

from datetime import datetime

def updateBookingRecords(payload):
    try:   
        formData = {}
        formData['customerId'] = payload['email']
        formData['roomType'] =  payload['RoomType']
        formData['price'] = payload['price']
        formData['bookingDate'] = payload['bookingDate']
        formData['bookingId'] = payload['bookingId']

        url = "https://us-east1-serverlessbb.cloudfunctions.net/updateBookingRecords"
        payload = {"payload": payload}
        headers =  {"Content-Type":"application/json"}

        request = requests.post(url=url, headers=headers, data=json.dumps(payload))
        return True

    except Exception as e:
        return False


def updateRevenueRecord(payload):
    try:
        formData = {}
        formData['date'] = payload['bookingDate']
        formData['revenue'] = payload['revenue']

        url = "https://us-central1-serverlessbb.cloudfunctions.net/updateRevenueRecordv2"
        payload = {"payload": payload}
        headers =  {"Content-Type":"application/json"}
        request = requests.post(url=url, headers=headers, data=json.dumps(payload))
        return True  
    except Exception as e:
        return False


def updateAdminRecord(payload):
    try: 
        updateBookingRecords(payload)
        updateRevenueRecord(payload)
        return request.status_code
    except Exception as e:
        pass
    



def subscribe(event, context):
    pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    print(json.loads(pubsub_message))
    pubsub_message_json = json.loads(pubsub_message)
    
    headers =  {"Content-Type":"application/json"}
    # api-endpoint
    URL = "https://ugrnt4blehppirrowe4q3k3j2u0ecqay.lambda-url.us-east-1.on.aws/"

    # sending post request and saving response as response object
    r = requests.post(url = URL, data = json.dumps(pubsub_message_json), headers=headers)

    print(r.text)
