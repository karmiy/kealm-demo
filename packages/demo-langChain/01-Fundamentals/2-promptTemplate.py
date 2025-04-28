"""
Prompt Templates - 提示模板，用于在提供给 llm 问题之前，先生成结构化的提示文本

LangChain 的提示模板用于创建可复用的提示文本：
1. PromptTemplate - 简单文本模板，支持变量插入
2. 可以使用占位符 {variable} 作为变量，在运行时替换
3. 提供了 invoke() 方法，用于生成包含实际变量值的提示文本
"""

from langchain_core.prompts import PromptTemplate
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

# 其实就是帮我们把语句创建一个提示词模板
prompt = PromptTemplate.from_template("你好，你能帮我总结一下{topic}有哪些核心功能吗？")
# 或
# prompt = PromptTemplate(
#     template="你好，你能帮我总结一下{topic}有哪些核心功能吗？",
#     input_variables=["topic"],
# )

print("*" * 50)
# 输出
# <class 'langchain_core.prompt_values.StringPromptValue'> text='你好，你能帮我总结一下LangChain有哪些核心功能吗？'
# 这是 PromptValue 对象，具体是 StringPromptValue 类的实例，也就是说是个对象，并不是字符串
result = prompt.invoke({"topic": "LangChain"})
print(type(result), result, result.to_string())
print("*" * 50)
