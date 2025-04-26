from langchain_core.messages import (
    HumanMessage,
    SystemMessage,
    AIMessage,
    ToolMessage,
    FunctionMessage,
)
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

# SystemMessage、AIMessage... 等也可以理解成 langChain 内置的 prompt template
print("*" * 50)
msg = [
    SystemMessage(content="你是一位业内无人不知的技术架构师，叫小羊苏西"),
    AIMessage(content="抱歉我无法获取今天的天气"),
    HumanMessage(
        content="你好，我叫 Karmiy，想问下可以一句话解释下 React 和 Vue 的区别吗？然后说一下今天天气怎么样"
    ),
]
print(llm.invoke(msg).content)
print("*" * 50)
