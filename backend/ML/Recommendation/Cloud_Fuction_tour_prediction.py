from google.cloud import bigquery,storage
import csv
import json
import flask
from flask_cors import cross_origin

storage_client =storage.Client()

def updatecsv(data_list):
    with open('/tmp/predict1.csv', 'w') as csvfile:
        filewriter = csv.writer(csvfile, delimiter=',',
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
        filewriter.writerow(['UserId', 'Date','No_Days_of_StayBooked'])
        filewriter.writerow(data_list)
    with open('/tmp/test.csv', 'r') as file_obj:
        bucket = storage_client.get_bucket("myuser_data")
        blob = bucket.blob("predict1.csv")
        blob.upload_from_file(file_obj)
    
def item():
  client = bigquery.Client()

  job_config = bigquery.LoadJobConfig(
  schema=[
      bigquery.SchemaField("UserId", "STRING"),
      bigquery.SchemaField("Date", "STRING"),
      bigquery.SchemaField("No_Days_of_StayBooked", "INTEGER")
  ], skip_leading_rows=1,
    # The source format defaults to CSV, so the line below is optional.
    source_format=bigquery.SourceFormat.CSV,
)


  table_id="my-serverless-project-1-356602.tourData.predict1"
  uri = "gs://myuser_data/predict1.csv"

  load_job = client.load_table_from_uri(
  uri,
  table_id,
  job_config=job_config,
  )  
  load_job.result() 
  destination_table = client.get_table(table_id)
  print("Loaded {} rows.".format(destination_table.num_rows))

@cross_origin() 
def make_prediction(request):
  request=request.get_json
  data_list=["Abcd","22-22-2022",3]
  #updatecsv(data_list)
  item()
  client = bigquery.Client()
  sql = """
      SELECT
  *
  FROM
  ML.PREDICT(MODEL `my-serverless-project-1-356602.tourData.mymodel`,
      (
      SELECT
      *
      FROM
      `my-serverless-project-1-356602.tourData.predict1`))
  """
  
  # Start the query, passing in the extra configuration.
  query_job = client.query(sql)  # Make an API request.
  query_job.result()  # Wait for the job to complete.
  

  for row in query_job:
      result=row[0]
  responseBody={}

  responseBody["days"]=result
  responseBody['statusCode']=200

  return responseBody