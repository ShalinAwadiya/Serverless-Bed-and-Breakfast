from google.cloud import storage
import io
import pandas as pd
from datetime import datetime
import flask
from flask_cors import cross_origin
storage_client = storage.Client()

data_bucket_name = "serverlessbb"
booking_data_file_path = "booking_data.csv"

headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
            }

def validate_response(payload: dict):
    booking_details = {}
    try:
        booking_details['bookingId'] = str(payload['bookingId'])
        booking_details['customerId'] = str(payload['customerId'])
        booking_details['roomType'] = str(payload['RoomType'])
        booking_details['bookingDate'] = datetime.strptime(str(payload['bookingDate']), '%d-%m-%Y')
        booking_details['bookingDayPeriod'] = str(payload['bookingDayPeriod'])
        return booking_details
    except Exception as e:
        print("ERROR VALIDATION: ", str(e))
        raise Exception(str(e))


def load_csv_to_df():
    bucket = storage_client.bucket(data_bucket_name)
    blob = bucket.blob(booking_data_file_path)
    data = blob.download_as_string()
    df = pd.read_csv(io.BytesIO(data))
    # print("DATA", df)
    return df


def add_row_to_df(df: pd.DataFrame, booking_details):
    df = df.append(booking_details,ignore_index=True)
    return df


def save_df_to_bucket(df):
    bucket = storage_client.get_bucket(data_bucket_name)
    bucket.blob(booking_data_file_path).upload_from_string(df.to_csv(index=False), 'text/csv')


def process_data(payload):
    try:
        booking_details = validate_response(payload)
        print(booking_details)
        df = load_csv_to_df()
        df = add_row_to_df(df, booking_details)
        save_df_to_bucket(df)
        return True
    except Exception as e:
        print("ERROR: ", str(e))
        return False


@cross_origin()
def process_request(request):
    request_json = request.get_json()
    print("REQUEST", request_json)
    if request_json and 'payload' in request_json:
        if process_data(request_json['payload']):
            response = flask.jsonify({"success": True})

            return response
        else:
            response = flask.jsonify({"success": False})
            # response.headers.set('Access-Control-Allow-Origin', '*')
            # response.headers.set('Access-Control-Allow-Methods', 'GET, POST')
            # response.headers.set('Access-Control-Allow-Headers', '*');
            return response
    else:
            response = flask.jsonify({"success1": False})
            # response.headers.set('Access-Control-Allow-Origin', '*')
            # response.headers.set('Access-Control-Allow-Methods', 'GET, POST')
            # response.headers.set('Access-Control-Allow-Headers', '*');
            return response
