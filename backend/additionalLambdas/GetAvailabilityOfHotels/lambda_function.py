import json
import boto3
from boto3.dynamodb.conditions import Key
import datetime
from datetime import timedelta



def lambda_handler(event, context):
    
    # print(event)
    roomType=event['queryStringParameters']['roomType']
    startDate_in_differentformat=event['queryStringParameters']['startDate']
    noOfDays=int(event['queryStringParameters']['noOfDays'])
    
    startDateList = startDate_in_differentformat.split('-') 
    startDate = startDateList[1]+'-'+startDateList[0]+'-'+startDateList[2]
    
    # print("Room Type:",roomType)
    # print("Start Date:",startDate)
    # print("No of Days:",noOfDays)

    
     
    
    rooms = getTotalRooms(roomType) # [Decimal(201), Decimal(202)]
    # print("Rooms:",rooms)
    
    
    dates_in_string = makeDate(startDate,noOfDays) # ["15072022", "16072022" ....]
    # print("Dates in string:",dates_in_string)
    
    
    rooms_in_number_format = []
    for i in rooms: #[202,201]
        rooms_in_number_format.append(int(i))
    rooms_in_number_format.sort() #[201,202]
    # print("Rooms in number format:",rooms_in_number_format)
    
    
    availability = getRoomAvailability(rooms_in_number_format,dates_in_string)
    # print("Availability:",availability)
    
    
    return {
        'statusCode': 200,
        'body': json.dumps({"availability": availability}),

    }


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
    

    

def getRoomAvailability(rooms ,dates):
    """
    sample response : { 201: [15072022, 16072022, 17072022] } 
    
    """
    availability = {}
    for room in rooms:
        #print("Room",room)
        booked_dates_for_room=[]
        availability[str(room)] =[]
        #print(availability)
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('BookingDetailsv2') 
        resp = table.query(
            IndexName="RoomId-index",
            KeyConditionExpression=Key('RoomId').eq(room)
        )
        
        if 'Items' in resp:
            for i in range(len(resp['Items'])):
                #print("Item:",resp['Items'][i])
                booked_dates_for_room.append(str(resp['Items'][i]['BookingDate']))
        #print("Booked dates for room:",booked_dates_for_room)        
        for j in dates:
            if j in booked_dates_for_room:
                pass
            else:
                availability[str(room)].append(j)
    response = []
    for key in availability.keys():
        data = {}
        response.append({'room': key, "available": availability[key] })
    return response



def getTotalRooms(RoomType):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Rooms') 
    resp = table.query(
        IndexName="RoomType-index",
        KeyConditionExpression=Key('RoomType').eq(RoomType)
    )
      
    rooms=[]   
    if 'Items' in resp:
        for i in range(resp['Count']):
            temp=resp['Items'][i]['RoomId']
            rooms.append(temp)
    return rooms;
    
    