import asyncio

from fastapi import BackgroundTasks, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from uvicorn import Config, Server

from constants import BASE_URL, PORT
from tokens_storage import TokensStorage

app = FastAPI()
storage = TokensStorage()

origins = [
    "https://react-qrcode-generator.herokuapp.com",
    "http://react-qrcode-generator.herokuapp.com"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount("/static", StaticFiles(directory='./static'), name="static")


@app.get(BASE_URL + '/generate')
async def generate_page(background_tasks: BackgroundTasks, text: str):
    try:
        token = storage.generate_qrcode(text)
        background_tasks.add_task(clean_storage, token)

        return {'message': 'ok', 'token': token}
    except Exception as e:
        print(e)
        return {'message': 'error'}


async def clean_storage(token):
    await storage.delete_by_token(token)


def run_local():
    loop = asyncio.get_event_loop()
    config = Config(app=app, host='127.0.0.1', port=PORT, loop=loop)
    server = Server(config)

    loop.run_until_complete(server.serve())
