import os
import uuid
import asyncio
from datetime import datetime

import qrcode

from constants import FILE_PATH


class TokensStorage:
    # todo make self.__tokens dict
    def __init__(self):
        self.__tokens = []

    @staticmethod
    def __generate_token():
        return str(uuid.uuid4())

    def generate_qrcode(self, data: str):
        try:
            token = self.__generate_token()
            filename = FILE_PATH + token + '.png'
            # generate qr code
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=0,
            )
            qr.add_data(data)
            qr.make(fit=True)
            img = qr.make_image(fill_color="#0d1117", back_color="white")
            # save qr code to file
            img.save(filename)
            self.__add(token)
            return token

        except Exception as e:
            print(e)

    def __add(self, token: str):
        seconds = datetime.today().timestamp()
        self.__tokens.append((token, seconds))

    def __delete(self, index: int):
        try:
            os.remove(f'./static/qr-code-{self.__tokens[index][0]}.png')
            del self.__tokens[index]
             
        except Exception as e:
            print(e)

    async def find_and_delete(self, token: str):
       
        await asyncio.sleep(15)
        for ind, item in enumerate(self.__tokens):
            if item[0] == token:
                self.__delete(ind)
                break
                
       
