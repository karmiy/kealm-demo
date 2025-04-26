from langchain_core.prompts import PromptTemplate
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

# 其实就是帮我们把语句创建一个提示词模板
prompt = PromptTemplate.from_template("你好，你能帮我总结一下{topic}有哪些核心功能吗？")

print("*" * 50)
# 输出 text='你好，你能帮我总结一下LangChain有哪些核心功能吗？'
print(prompt.invoke({"topic": "LangChain"}))
print("*" * 50)
