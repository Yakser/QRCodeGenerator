import asyncio
import random
from tokens_storage import TokensStorage
import qrcode
from flask import Flask, request

app = Flask(__name__)
app.secret_key = "dsjgfjkdshfjksdhfbsjkdfhsdjkhfskdfl"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
loop = asyncio.get_event_loop()

BASE_URL = '/api'

storage = TokensStorage()

@app.route(BASE_URL + '/generate')
def generate():
    # get data from query string
    data = request.args.get('text')
    # generate random token for filename
    token = "".join(
        [random.choice("qwertyuiopasdfghjklzxcvbnm1234567890") for _ in range(10)])
    # storage.delete(0)
    storage.add(token)
    filename = "static/qr-code" + token + '.png'
    # generate qr code
    img = qrcode.make(data)
    # save qr code to file
    img.save(filename)
    return {'message': 'ok', 'token': token}


@app.after_request
def after_request_func(response):
    global storage
    if '/static/' in request.base_url:
        loop.run_until_complete(storage.delete(0))
    return response

if __name__ == '__main__':
    app.run()
