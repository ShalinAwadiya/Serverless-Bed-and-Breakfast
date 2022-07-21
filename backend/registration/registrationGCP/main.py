import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

PROJECT_ID = "serverless-project-357002"

cred = credentials.ApplicationDefault()
default_app = firebase_admin.initialize_app(cred, {
  'projectId': PROJECT_ID,
})


def hello_world(request):

  if request.method == 'OPTIONS':
    # Allows GET requests from any origin with the Content-Type
    # header and caches preflight response for an 3600s
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600'
    }
    return ('', 204, headers)
  
  request_json = request.get_json(silent=True)

  userSub = request_json['userSub']
  caesarKey = request_json['caesarKey']

  db = firestore.client()
  print("Firestore client created")

  doc_ref = db.collection('Users').document(userSub)
  doc = doc_ref.get()
  headers = {
        'Access-Control-Allow-Origin': '*'
    }
    
  if doc.exists:
    return ("User already exists", 200, headers)
  else:
    doc_ref.set({'userSub': userSub, 'caesarKey': caesarKey})
    return ("User inserted", 200, headers)
