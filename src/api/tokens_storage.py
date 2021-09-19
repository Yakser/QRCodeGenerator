import os 


class TokensStorage:
    def __init__(self):
        self.__tokens = []

    def add(self, token: str):
        self.__tokens += [token]

    async def delete(self, index: int):
        try:
            os.remove(f'./static/qr-code{self.__tokens[index]}.png')
            del self.__tokens[index]
        except Exception as e:
            print(e)

    def get_earliest(self):
        return self.__tokens[0] if self.__tokens else None
