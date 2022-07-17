
import base64
import json
import os
from google.cloud import pubsub_v1


# Instantiates a Pub/Sub client
publisher = pubsub_v1.PublisherClient()
PROJECT_ID = "authentic-codex-352820"

# Publishes a message to a Cloud Pub/Sub topic.
def publish(request):
    request_json = request.get_json(silent=True)

    topic_name = "TourOperatorTopic"
    message = request_json
    if not message:
        return ('Missing Body', 400)

    print(f'Publishing message to topic {topic_name}')

    # References an existing topic
    topic_path = publisher.topic_path(PROJECT_ID,topic_name)

    message_json = json.dumps({
        'data': {'message': 'Tour Booking Done Successfully','data':message},
    })
    message_bytes = message_json.encode('utf-8')

    # Publishes a message
    try:
        publish_future = publisher.publish(topic_path, data=message_bytes)
        publish_future.result()  # Verify the publish succeeded
        return 'Tour Booking Done Successfully.'
    except Exception as e:
        print(e)
        return (e, 500)