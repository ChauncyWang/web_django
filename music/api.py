

class BaseRequest:

    def __init__(self):
        self.id = "ss"

    def search_by_name(self):
        self.id = "sss"
        raise Exception("")
