"""
Chain Calling - 链式调用机制，用于构建 LLM 应用的处理流程

LangChain 的链式调用基于 Python 的管道操作符 "|"：
1. 每个组件都实现了 __or__ 魔法方法，使其可以参与链式调用
2. 通过 | 连接的组件会按顺序处理数据，前一个组件的输出作为后一个组件的输入
3. 链式调用让数据处理流程更加清晰和模块化
4. 这种方式构建的处理流程易于理解和维护
"""

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
