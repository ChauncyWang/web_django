
def msg_register(msg_type):
    def decorator(fn):
        fn()
    return decorator
