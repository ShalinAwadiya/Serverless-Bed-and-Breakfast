import json
import boto3
from boto3.dynamodb.conditions import Key, Attr

email = None

dynamodb = boto3.resource('dynamodb')

def filterNotifications(email):
    try:
        bookingNotificationDetails = "notificationDetails"
        tourBookingNotificationDetails = "tourNotificationDetails"
        
        
        booking_msg_fmt = "Your room {roomNo} for {bookingDays} days on date has been booked for {price}$." \
                          " Keep Booking Id: {bookingId} for reference"
                          
        tour_booking_msg_fmt = "Your tour {tourName} been booked for date {bookingDate} in price {price}$." \
                  " Keep Booking Id: {bookingId} for reference"
    
        table = dynamodb.Table(bookingNotificationDetails)
        
        tableTourBooking = dynamodb.Table(tourBookingNotificationDetails)
        
        
        response = table.query(
            IndexName='email-index',
            KeyConditionExpression=Key('email').eq(email)
        )
        
        tourResponse = tableTourBooking.query(
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
    
            notifications.append({"timeStamp": str(notification['timeStamp'])[0:-4], "message": booking_msg })
        
        for notification in tourResponse["Items"]:
            tour_booking_msg = tour_booking_msg_fmt.format(tourName=notification['bookingDetails']['tourName'],
                                                 bookingDate=notification['bookingDetails']['bookingDate'],
                                                 price=notification['bookingDetails']['price'],
                                                 bookingId=notification['bookingDetails']['bookingId']
                                                 )
    
            notifications.append({"timeStamp": str(notification['timeStamp'])[0:-4], "message": tour_booking_msg })
    
        return json.dumps({"message": notifications})
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
            'body': filterNotifications(email),
        }

    except Exception as e:
        return {
            'statusCode': 400,
            'error': str(e)
        }
