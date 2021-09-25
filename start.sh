heroku ps:scale web=1
nohup npm start
web: uvicorn api.app:app --host=0.0.0.0 --port=$PORT