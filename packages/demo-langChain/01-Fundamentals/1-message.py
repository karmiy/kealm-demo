"""
Message Types - 消息类型，用于构建与 LLM 的对话

LangChain 提供了多种消息类型，用于构建结构化的对话：
1. SystemMessage - 系统指令，设定 AI 的行为和角色定位
2. HumanMessage - 用户消息，表示用户输入的内容
3. AIMessage - AI 回复，表示模型的响应
4. ToolMessage - 工具消息，表示工具调用的结果
5. FunctionMessage - 函数消息，表示函数调用的结果
"""

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

# 一般来说，llm 返回的是个复杂对象，主要内容是在 content 字段里
# {
#   "content": "Vue.js 是一个用于构建用户界面的渐进式 JavaScript 框架...（完整文本内容）",
#   "additional_kwargs": {
#     "refusal": null
#   },
#   "response_metadata": {
#     "token_usage": {
#       "completion_tokens": 280,
#       "prompt_tokens": 21,
#       "total_tokens": 301,
#       "completion_tokens_details": null,
#       "prompt_tokens_details": {
#         "audio_tokens": null,
#         "cached_tokens": 0
#       }
#     },
#     "model_name": "qwen-plus",
#     "system_fingerprint": null,
#     "id": "chatcmpl-27a5005e-04bf-98b9-b4c3-970572f02416",
#     "finish_reason": "stop",
#     "logprobs": null
#   },
#   "id": "run-f4dfe556-7440-41bb-bc49-3d16adb1a048-0",
#   "usage_metadata": {
#     "input_tokens": 21,
#     "output_tokens": 280,
#     "total_tokens": 301,
#     "input_token_details": {
#       "cache_read": 0
#     },
#     "output_token_details": {}
#   }
# }