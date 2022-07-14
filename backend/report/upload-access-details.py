from google.cloud import storage
import io
import pandas as pd
from datetime import datetime
import flask
from flask_cors import cross_origin

access_details = {}
storage_client = storage.Client()

data_bucket_name = "serverlessbb27"
access_data_file_path = "access_data.csv"

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*'
}

def validate_response(payload: dict):
    access_details = {}
    print("RES VAL", payload)
    try:
        access_details['userId'] = payload['userId']
        access_details['email'] = payload['email']
        access_details['action'] = payload['action']
        access_details['timestamp'] = datetime.strptime(payload['timestamp'], '%d/%m/%Y %H:%M:%S')
        return access_details
    except Exception as e:
        raise Exception("Not valid")


def load_csv_to_df():
    bucket = storage_client.bucket(data_bucket_name)
    blob = bucket.blob(access_data_file_path)
    data = blob.download_as_string()
    df = pd.read_csv(io.BytesIO(data))
    print("DATA", df)
    return df


def add_row_to_df(df: pd.DataFrame, access_details):
    df = df.append(access_details,ignore_index=True)
    return df


def save_df_to_bucket(df):
    bucket = storage_client.get_bucket(data_bucket_name)
    bucket.blob(access_data_file_path).upload_from_string(df.to_csv(index=False), 'text/csv')


def process_data(payload):
    try:
        access_details = validate_response(payload)
        print(access_details)
        df = load_csv_to_df()
        df = add_row_to_df(df, access_details)
        save_df_to_bucket(df)
        return True
    except Exception as e:
        print("ERROR: ", str(e))
        return False

@cross_origin()
def process_request(request):
    request_json = request.get_json()
    if request_json and 'payload' in request_json:
        if process_data(request_json['payload']):
            response = flask.jsonify({"success": True})
            return response
        else:
            response = flask.jsonify({"success": False})
            return response
    else:
        response = flask.jsonify({"success1": False})
        return response