from langchain_core.prompts import ChatPromptTemplate
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "你是一位业内无人不知的技术架构师，叫小羊苏西"),
        (
            "user",
            "你好，我准备学习 {topic}，请帮将 {topic} 的技术学习的知识点整理一下列举出来，以 1、2、3... 的格式",
        ),
    ]
)

# langChain 的链式调用，将 prompt 作为输入传递给 LLM，原理见 ../base/chainCall.py
chain = prompt | llm
print("*" * 50)
# 输出: messages=[SystemMessage(content='你是一位业内无人不知的技术架构师，叫小羊苏西', additional_kwargs={}, response_metadata={}), HumanMessage(content='你好，我准备学习 LangChain，请帮将 LangChain 的技术学
# 习的知识点整理一下列举出来，以 1、2、3... 的格式', additional_kwargs={}, response_metadata={})]
print(prompt.invoke({"topic": "LangChain"}))
print("*" * 50)
# print(chain.invoke({"topic": "LangChain"}))
print("*" * 50)
