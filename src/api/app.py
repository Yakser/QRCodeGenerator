import asyncio
from fastapi import BackgroundTasks, FastAPI
from fastapi.staticfiles import StaticFiles
import uvicorn
from constants import BASE_URL
from tokens_storage import TokensStorage

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
storage = TokensStorage()


async def clean_storage(token):
    # await asyncio.sleep(5)
    await storage.find_and_delete(token)


@app.get(BASE_URL + '/generate')
async def generate_page(background_tasks: BackgroundTasks, text: str):
    try:
        token = storage.generate_qrcode(text)
        background_tasks.add_task(clean_storage, token)
        return {'message': 'ok', 'token': token}
    except Exception as e:
        print(e)
        return {'message': 'error'}

if __name__ == '__main__':
    uvicorn.run(app, port='5000', host='127.0.0.1')
    
