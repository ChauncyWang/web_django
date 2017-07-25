import hashlib

from wxoa.services import config


def validate_token(GET, token=config.token):
    """
    对请求进行验证,判断是否为微信客户端的请求
    :param GET:
    :param token: token 码,要和公众号平台设置的一致
    :return: 验证成功返回请求的 echostr 参数
    """
    try:
        signature = GET.get('signature')
        timestamp = GET.get('timestamp')
        nonce = GET.get('nonce')
        echostr = GET.get('echostr')
        # 进行加密(按 token timestamp nonce 字典排序连接成字符串,然后 对字符串进行 sha1 加密)
        validate = [token, timestamp, nonce]
        validate.sort()
        validate = "".join(validate)
        sha1 = hashlib.sha1(validate.encode("UTF8"))
        hashcode = sha1.hexdigest()

        if hashcode == signature:
            return echostr
        else:
            return "false"
    except Exception:
        return "false"
