import abc
from email import header
import boto3
import re   
import hashlib 
from datetime import datetime
import requests
import json
user_bot_selection = None

bot_credentials = dict()
bot_credentials['ParentBot'] = {"botId": "NVDL0JKV39", "botAliasId": "TSTALIASID"}
bot_credentials['BookingRoomBot'] = {"botId": "TQAUKMKNTJ", "botAliasId": "TSTALIASID"}
bot_credentials['FoodOrderBot'] = {"botId": "6WLLLZJN4Z", "botAliasId": "TSTALIASID"}
bot_credentials['SearchRoomBot'] = {"botId": "A5JGKIUKCL", "botAliasId": "TSTALIASID"}
email_regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$' 
email = None

def setUserBotSelection(botName):
    global user_bot_selection
    user_bot_selection = botName


class ProcessUserQueries(metaclass=abc.ABCMeta):
    def __init__(self):
        pass

    def get_bot_client(self):
        return boto3.client('lexv2-runtime')

    @abc.abstractmethod
    def triggerBot(self, request_message: str, sessionId):
        pass

    @abc.abstractmethod
    def makeResponse(self, message, sessionId):
        pass
    

    
    def isRequestConfirmed(self, intent):
        state = intent['sessionState']['intent']['confirmationState']
        if state == "Confirmed":
            return True
        return False

    def giveNextMessage(self, intent):
        message = intent['messages'][0]['content']
        return message

    def isStateForFulfilment(self, intent):
        state = intent['sessionState']['intent']['state']
        if state == "ReadyForFulfillment":
            return True
        return False

    def getSlotValue(self, intent, slotName):
        return intent['slots'][slotName]['value']['resolvedValues'][0]

    def submitRequest(self, url, headers, payload):
        response = requests.post(url=url, data=json.dumps(payload), headers=headers)
        return response.status_code

class ParentBot(ProcessUserQueries):
    def __init__(self):
        super().__init__()
        self.queryStringParameters = None
        self.bot_creds = bot_credentials['ParentBot']

    def setQueryStringParameters(self, queryStringParameters):
        self.queryStringParameters = queryStringParameters

    def triggerBot(self, request_message: str, sessionId):
        client = self.get_bot_client()
        response = client.recognize_text(
            botId=self.bot_creds['botId'],
            botAliasId=self.bot_creds['botAliasId'],
            localeId='en_US',
            sessionId=sessionId,
            text=request_message)
        return response

    def makeResponse(self, message, sessionId):
        response = {}
        bot_response = self.triggerBot(message, sessionId)
        # response['intent'] = bot_response
        # print(bot_response)
        if self.isStateForFulfilment(bot_response):
            response['nextMessage'] = self.giveNextMessage(bot_response)
            setUserBotSelection(self.getSlotValue(bot_response['sessionState']['intent'], "IntentType"))
        else:
            response['nextMessage'] = self.giveNextMessage(bot_response)

        return response


class BookingRoom(ProcessUserQueries):
    def __init__(self):
        super().__init__()
        self.queryStringParameters = None
        self.bot_creds = bot_credentials['BookingRoomBot']

    def triggerBot(self, request_message: str, sessionId):
        client = self.get_bot_client()
        response = client.recognize_text(
            botId=self.bot_creds['botId'],
            botAliasId=self.bot_creds['botAliasId'],
            localeId='en_US',
            sessionId=sessionId,
            text=request_message)
        return response

    def makeResponse(self, message, sessionId):
        response = {}
        bot_response = self.triggerBot(message, sessionId)
        response['debug'] = bot_response
        if self.isRequestConfirmed(bot_response):
            response['nextMessage'] = self.giveNextMessage(bot_response)
            response['CONFIRMED'] = self.bookRoom(sessionId, bot_response)
            
        else:
            response['nextMessage'] = self.giveNextMessage(bot_response)

        return response


    def getRoomAvailability(self):
        return { "roomNo":201, "price": 50 }

    
    def bookRoom(self, sessionId, bot_response):
        url = "https://us-central1-authentic-codex-352820.cloudfunctions.net/HotelManagementTopic"
        headers = { 'access-control-allow-origin': '*',
                    'content-type': 'application/json'}
    
        if(re.search(email_regex, email)):
            try:

                payload = {}
                payload['email'] = email
                payload['roomNo'] = self.getRoomAvailability()["roomNo"]
                payload['price'] = self.getRoomAvailability()['price']
                payload['bookingDate'] = datetime.strptime(bot_response['sessionState']['intent']['slots']['BookingRoomDate']['value']['resolvedValues'][0], "%Y-%m-%d").strftime("%d-%m-%Y")
                payload['bookingDays'] = bot_response['sessionState']['intent']['slots']['BookingRoomDuration']['value']['resolvedValues'][0]
                return self.submitRequest(url, headers, payload)
            except Exception as e:
                return str(e)

        else:
            pass

class OrderFood(ProcessUserQueries):
    def __init__(self):
        super().__init__()
        self.queryStringParameters = None
        self.bot_creds = bot_credentials['FoodOrderBot']

    def makeResponse(self, message, sessionId):
        response = {}
        bot_response = self.triggerBot(message, sessionId)
        if self.isStateForFulfilment(bot_response):
            response['nextMessage'] = self.giveNextMessage(bot_response)
            
        else:
            response['nextMessage'] = self.giveNextMessage(bot_response)
        return response

    def triggerBot(self, request_message: str, sessionId):
        client = self.get_bot_client()
        response = client.recognize_text(
            botId=self.bot_creds['botId'],
            botAliasId=self.bot_creds['botAliasId'],
            localeId='en_US',
            sessionId=sessionId,
            text=request_message)
        return response

class SearchRoom(ProcessUserQueries):
    def __init__(self):
        super().__init__()
        self.queryStringParameters = None
        self.bot_creds = bot_credentials['SearchRoomBot']

    def triggerBot(self, request_message: str, sessionId):
        client = self.get_bot_client()
        response = client.recognize_text(
            botId=self.bot_creds['botId'],
            botAliasId=self.bot_creds['botAliasId'],
            localeId='en_US',
            sessionId=sessionId,
            text=request_message)
        return response

    def makeResponse(self, message, sessionId):
        response = {}
        bot_response = self.triggerBot(message, sessionId)
        response['debug'] = bot_response
        if self.isRequestConfirmed(bot_response):
            response['nextMessage'] = self.giveNextMessage(bot_response)
            response['CONFIRMED'] = self.bookRoom(sessionId, bot_response)
            
        elif self.isStateForFulfilment(bot_response):
            response['availibiltiy'] = self.getRoomAvailability()
            response['nextMessage'] = self.giveNextMessage(bot_response)

        return response


    def getRoomAvailability(self):
        return { "roomNo":201, "price": 50 }

    
    def bookRoom(self, sessionId, bot_response):
        url = "https://us-central1-authentic-codex-352820.cloudfunctions.net/HotelManagementTopic"
        headers = { 'access-control-allow-origin': '*',
                    'content-type': 'application/json'}
    
        if(re.search(email_regex, email)):
            try:

                payload = {}
                payload['email'] = email
                payload['roomNo'] = self.getRoomAvailability()["roomNo"]
                payload['price'] = self.getRoomAvailability()['price']
                payload['bookingDate'] = datetime.strptime(bot_response['sessionState']['intent']['slots']['BookingRoomDate']['value']['resolvedValues'][0], "%Y-%m-%d").strftime("%d-%m-%Y")
                payload['bookingDays'] = bot_response['sessionState']['intent']['slots']['BookingRoomDuration']['value']['resolvedValues'][0]
                return self.submitRequest(url, headers, payload)
            except Exception as e:
                return str(e)

        else:
            pass


def selectBot(queryStringParameters) -> ProcessUserQueries:
    global user_bot_selection
    if "CurrentBot" in queryStringParameters.keys():
        if queryStringParameters['CurrentBot'] in bot_selection.keys():
            user_bot_selection = queryStringParameters['CurrentBot']
            return bot_selection[queryStringParameters['CurrentBot']]

    return ParentBot()


def handleQueries(queryStringParameters):
    global email
    message = queryStringParameters['message']
    userId = queryStringParameters['UserId']
    email = userId
    bot = selectBot(queryStringParameters)
    response = bot.makeResponse(message, hashlib.sha1(userId.encode("utf-8")).hexdigest())
    return response


bot_selection = {"bookroom": BookingRoom(), "orderfood": OrderFood(), "searchroom": SearchRoom()}


def lambda_handler(event, context):
    try:
        print("EVENT", event)
        print("CONTEXT", context)
        bot_response = handleQueries(event['queryStringParameters'])
        return {
                   'statusCode': 200,
                   'CurrentBot': user_bot_selection,
                #   'NextMessage': bot_response['nextMessage'],
                    'NextMessage': bot_response,
               },

    except Exception as e:
        return {
            'statusCode': 400,
            'error': str(e)
        }
