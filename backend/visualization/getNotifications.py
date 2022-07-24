import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

email = None
dummyData = [{"timeStamp": "1658080836", "message": "hotel Booking Successfully"},
             {"timeStamp": "1758080836", "message": "hotel Booking Successfully 2"}, ]
dynamodb = boto3.resource('dynamodb')

def filterNotifications(email):
    bookingNotificationDetails = "notificationDetails"
    booking_msg_fmt = "Your room {roomNo} for {bookingDays} days has beed booked for {price}$." \
                      " Keep BookingId: {bookingId} for reference"

    table = dynamodb.Table(bookingNotificationDetails)
    response = table.query(
        IndexName='email-index',
        KeyConditionExpression=Key('email').eq(email)
    )

    notifications = []
    for notification in response["Items"]:
        booking_msg = booking_msg_fmt.format(roomNo=notification['bookingDetails']['roomNo'],
                                             bookingDays=notification['bookingDetails']['bookingDays'],
                                             price=notification['bookingDetails']['price'],
                                             bookingId=notification['bookingDetails']['bookingId']
                                             )

        notifications.append({"timeStamp": notification['timeStamp'], "message": booking_msg})

    return notifications


def lambda_handler(event, context):
    global email
    try:
        print("EVENT", event)
        print("CONTEXT", context)
        email = event['queryStringParameters']
        return {
            'statusCode': 200,
            'notifications': filterNotifications(email),
            "response": filterNotifications(email)
        }

    except Exception as e:
        return {
            'statusCode': 400,
            'error': str(e)
        }
