# 链式调用原理
class Chain:
    def __init__(self, value):
        self.value = value

    def __or__(self, other):
        # 原理：会调用 __or__ 魔法方发
        return other(self.value)


def prompt(text):
    return "请求回答问题: {}".format(text)


a = Chain(value="什么是 AI？")

print(a | prompt)
