def exception(method):
    """
    异常处理 装饰器
    :param method: 装饰的函数
    """

    def wrapper(*args, **keyargs):
        try:
            return method(*args, **keyargs)
        except RequestException as e:
            print("[%s] 请求出错! 状态码[%d]" % (method.__name__, e.code))
        except ParameterException as e:
            print("[%s] 请求参数格式错误![%d:%s]" % (method.__name__, e.code, e.msg))
        except BaseException as e:
            print("[%s] API可能过期了!" % method.__name__)

    return wrapper


class RequestException(Exception):
    """
    http 请求返回的状态码不是 200
    """

    def __init__(self, code):
        self.code = code


class MayOldAPIException(Exception):
    """
    可能 api 过期了
    """

    def __init__(self, error):
        self.error = error


class ParameterException(Exception):
    """
    请求参数结构不对
    """

    def __init__(self, code, msg):
        self.code = code
        self.msg = msg
