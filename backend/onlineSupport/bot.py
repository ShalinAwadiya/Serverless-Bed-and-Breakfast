import abc
from email import header
import boto3
import re
import hashlib
from datetime import datetime
import requests
import json
import random

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
    botName = botName.replace(" ", "").lower()
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
        if message.lower() == "hello":
            response['nextMessage'] = self.giveNextMessage(bot_response)
        elif self.isStateForFulfilment(bot_response):
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
        # response['debug'] = bot_response
        if self.isRequestConfirmed(bot_response):
            # response['nextMessage'] = self.giveNextMessage(bot_response)
            response['nextMessage'] = self.bookRoom(sessionId, bot_response)

        else:
            response['nextMessage'] = self.giveNextMessage(bot_response)

        return response

    def getRoomAvailability(self, botResponse):
        roomPrice = {"general": 50, "semidelux": 100, "delux": 250, "skyview": 500, }
        startDate = datetime.strptime(
            botResponse['sessionState']['intent']['slots']['BookingRoomDate']['value']['resolvedValues'][0],
            "%Y-%m-%d").strftime("%d-%m-%Y")
        noOfDays = botResponse['sessionState']['intent']['slots']['BookingRoomDuration']['value']['resolvedValues'][0]
        roomType = botResponse['sessionState']['intent']['slots']['BookingRoomType']['value']['resolvedValues'][0]

        urlfmt = "https://jj6eksvjm6vppixjgmuyjizbma0qqxjm.lambda-url.us-east-1.on.aws/" \
                 "?startDate={startDate}" \
                 "&noOfDays={noOfDays}" \
                 "&roomType={roomType}"

        headers = {'access-control-allow-origin': '*',
                   'content-type': 'application/json'}

        url = urlfmt.format(startDate=startDate, noOfDays=noOfDays, roomType=roomType)
        r = requests.get(url, headers=headers)
        resp = r.json()
        for room in resp['availability']:
            if len(room["available"]) == int(noOfDays):
                return {"roomNo": room['room'], "price": roomPrice[roomType]}

        return None

    def bookRoom(self, sessionId, bot_response):
        url = "https://us-central1-authentic-codex-352820.cloudfunctions.net/HotelManagementTopic"
        headers = {'access-control-allow-origin': '*',
                   'content-type': 'application/json'}

        if (re.search(email_regex, email)):
            try:
                payload = {}
                payload['email'] = email
                payload['bookingId'] = random.randint(1000, 10000)
                payload['RoomType'] = \
                bot_response['sessionState']['intent']['slots']['BookingRoomType']['value']['resolvedValues'][0]

                availability = self.getRoomAvailability(bot_response)

                if availability:
                    payload['roomNo'] = availability["roomNo"]
                    payload['price'] = availability['price']
                    payload['bookingDate'] = datetime.strptime(
                        bot_response['sessionState']['intent']['slots']['BookingRoomDate']['value']['resolvedValues'][0],
                        "%Y-%m-%d").strftime("%d%m%Y")
                    payload['bookingDays'] = \
                        bot_response['sessionState']['intent']['slots']['BookingRoomDuration']['value']['resolvedValues'][0]
                    if int(self.submitRequest(url, headers, payload))  == 200:
                        return "Your Booking has been placed"
                    else:
                        return "Error while booking"
                    # return self.submitRequest(url, headers, payload)
                else:
                    return "No Room Available for the date, please try another range"

            except Exception as e:
                return str(e)

        else:
            pass


class OrderFood(ProcessUserQueries):
    def __init__(self):
        super().__init__()
        self.queryStringParameters = None
        self.bot_creds = bot_credentials['FoodOrderBot']

    def placeOrder(self, bot_response):

        try:
            headers = {'access-control-allow-origin': '*',
                       'content-type': 'application/json'}
            FoodPrice = {"coffee": 2, "tea": 2, "bagel": 4, "wrap": 5}

            url = "https://ubrqk7ctmctgdpncdkxxsrhvqe0dwefh.lambda-url.us-east-1.on.aws/"
            payload = {}
            payload['userSub'] = email
            payload['email'] = email
            payload['food'] = {"name": self.getSlotValue(bot_response['sessionState']['intent'], "FoodOrderDish"),
                               "price": FoodPrice[
                                   self.getSlotValue(bot_response['sessionState']['intent'], "FoodOrderDish")],
                               "qunatity": 1}
            #
            resp = requests.get(url, data=payload, headers=headers)
            return "done"
        except Exception as e:
            return str(e)


    def makeResponse(self, message, sessionId):
        try:

            response = {}
            bot_response = self.triggerBot(message, sessionId)
            if self.isRequestConfirmed(bot_response):
                response['nextMessage'] = self.giveNextMessage(bot_response)
                response['debug'] = self.placeOrder(bot_response)
                # response['bot'] = bot_response
            else:
                response['nextMessage'] = self.giveNextMessage(bot_response)
            return response
        except Exception as e:
            return {'error': str(e)}



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

    def getRoomAvailability(self, botResponse):
        def makeAvailableMessage(roomDates, roomId):
            availableStrFmt = "{roomNo} for dates {dates}"
            days = ""
            availableStr = ""

            for date in roomDates:
                days += ", " + datetime.strptime(date, "%d%m%Y").strftime("%d-%m")
            availableStr += availableStrFmt.format(roomNo=roomId, dates=days)

            return availableStr

        try:
            startDate = datetime.strptime(
                botResponse['sessionState']['intent']['slots']['BookingDate']['value']['resolvedValues'][0],
                "%Y-%m-%d").strftime("%d-%m-%Y")
            noOfDays = botResponse['sessionState']['intent']['slots']['BookingDaysNo']['value']['resolvedValues'][0]
            roomType = botResponse['sessionState']['intent']['slots']['BookingRoomType']['value']['resolvedValues'][0]

            urlfmt = "https://jj6eksvjm6vppixjgmuyjizbma0qqxjm.lambda-url.us-east-1.on.aws/" \
                     "?startDate={startDate}" \
                     "&noOfDays={noOfDays}" \
                     "&roomType={roomType}"

            headers = {'access-control-allow-origin': '*',
                       'content-type': 'application/json'}

            url = urlfmt.format(startDate=startDate, noOfDays=noOfDays, roomType=roomType)
            r = requests.get(url, headers=headers)
            resp = r.json()
            availableStr = ""
            for room in resp['availability']:
                availableStr += " " + makeAvailableMessage(room["available"],room["room"])

            return availableStr
        except Exception as e:
            return str(e)

    def makeResponse(self, message, sessionId):
        response = {}
        bot_response = self.triggerBot(message, sessionId)
        # response['debug'] = bot_response
        if self.isRequestConfirmed(bot_response):
            # response['nextMessage'] = self.giveNextMessage(bot_response)
            # response['nextMessage'] += str(self.getRoomAvailability(bot_response))
            response["nextMessage"] = "Your Search is : " + self.getRoomAvailability(bot_response)

        elif self.isStateForFulfilment(bot_response):
            response['nextMessage'] = self.giveNextMessage(bot_response)
            # response['nextMessage'] += str(self.getRoomAvailability(bot_response))

        else:
            response['nextMessage'] = self.giveNextMessage(bot_response)

        return response


def selectBot(queryStringParameters) -> ProcessUserQueries:
    global user_bot_selection
    if "CurrentBot" in queryStringParameters.keys():
        bot = queryStringParameters['CurrentBot'].replace(" ", "").lower()
        if bot in bot_selection.keys():
            user_bot_selection = bot
            return bot_selection[bot]

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
