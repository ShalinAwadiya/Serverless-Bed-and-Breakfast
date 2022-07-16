import base64
import json
import requests

def subscribe(event, context):
    pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    print(json.loads(pubsub_message))
    pubsub_message_json = json.loads(pubsub_message)
    
    headers =  {"Content-Type":"application/json"}
    # api-endpoint
    URL = "https://gpzmwaunconbcguoqwj7jqc6ki0apjlm.lambda-url.us-east-1.on.aws/"

    # sending post request and saving response as response object
    r = requests.post(url = URL, data = json.dumps(pubsub_message_json), headers=headers)

    print(r.text)
