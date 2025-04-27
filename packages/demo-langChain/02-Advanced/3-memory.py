"""
Memory - 管理对话历史和上下文，使模型能够"记住"之前的交互

LangChain 提供多种记忆类型来管理对话历史：
1. ConversationBufferMemory - 简单存储所有消息的历史记录
2. ConversationBufferWindowMemory - 只保留最近 k 轮对话
3. ConversationSummaryMemory - 自动总结历史对话，减少 token 使用
4. ConversationTokenBufferMemory - 基于 token 数量限制历史记录
5. ConversationEntityMemory - 跟踪对话中提到的实体信息

常见使用场景：
- 聊天机器人：保持对话连贯性
- 多轮问答：跟踪用户之前的问题和回答
- 上下文感知：让 AI 理解当前对话的背景
- 个性化互动：记住用户偏好和历史交互
"""

import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

from langchain.memory import ConversationBufferMemory, ConversationBufferWindowMemory
from langchain.memory import ConversationSummaryMemory, ConversationTokenBufferMemory
from langchain.chains import ConversationChain
from langchain_core.prompts import (
    PromptTemplate,
    ChatPromptTemplate,
    MessagesPlaceholder,
)
from langchain_core.messages import HumanMessage, AIMessage


def demo1_conversation_buffer_memory():
    """示例 1: 使用 ConversationBufferMemory 存储完整对话历史"""
    print("*" * 50)
    print("示例 1: 使用 ConversationBufferMemory 存储完整对话历史")
    print("*" * 50)

    # 创建一个记忆对象，存储所有历史对话
    memory = ConversationBufferMemory()

    # 添加一些对话历史
    memory.chat_memory.add_user_message("你好，我叫小明")
    memory.chat_memory.add_ai_message("你好小明，很高兴认识你！")

    # 查看记忆中的内容
    print("记忆中的内容:")
    # 输出 <class 'dict'> {'history': 'Human: 你好，我叫小明\nAI: 你好小明，很高兴认识你！'}
    print(type(memory.load_memory_variables({})), memory.load_memory_variables({}))

    # 创建一个带记忆的对话链
    # 默认提示模板包含 {history} 和 {input} 变量
    conversation = ConversationChain(llm=llm, memory=memory, verbose=True)

    # 进行多轮对话
    print("\n第一轮对话:")
    # input 内容会作为 user message 存在 memory 中

    # predict 实际上是插入一个预设的 prompt template:
    # The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

    # Current conversation:
    # {history}
    # Human: {input}
    # AI:

    # response 内容会作为 ai message 存在 memory 中
    response = conversation.predict(input="我今年18岁")
    print(f"AI: {response}")

    print("\n第二轮对话:")
    response = conversation.predict(input="我喜欢编程")
    print(f"AI: {response}")

    print("\n第三轮对话:")
    response = conversation.predict(input="还记得我叫什么名字吗？")
    print(f"AI: {response}")

    # 查看更新后的记忆
    print("\n更新后的记忆:")
    # 包含前面全部的对话
    print(memory.load_memory_variables({}))
    print("*" * 50)


def demo2_conversation_window_memory():
    """示例 2: 使用 ConversationBufferWindowMemory 只保留最近几轮对话"""
    print("*" * 50)
    print("示例 2: 使用 ConversationBufferWindowMemory 只保留最近几轮对话")
    print("*" * 50)

    # 创建一个窗口记忆对象，只保留最近 2 轮对话（一来一回算一轮）
    memory = ConversationBufferWindowMemory(k=2)

    # 创建带有窗口记忆的对话链
    conversation = ConversationChain(llm=llm, memory=memory, verbose=True)

    # 进行多轮对话
    queries = [
        "我是李四",
        "我喜欢打篮球",
        "我今年20岁",
        "我学习人工智能",
        "你还记得我的爱好吗？",  # 应该只能记住最近的2轮对话，忘记了打篮球
    ]

    for i, query in enumerate(queries):
        print(f"\n第{i+1}轮对话:")
        print(f"用户: {query}")
        response = conversation.predict(input=query)
        print(f"AI: {response}")

        # 每轮后显示当前记忆内容
        print(f"当前记忆内容 (保留最近{memory.k}轮):")
        print(memory.load_memory_variables({}))

    print("*" * 50)


def demo3_conversation_summary_memory():
    """示例 3: 使用 ConversationSummaryMemory 总结历史对话"""
    print("*" * 50)
    print("示例 3: 使用 ConversationSummaryMemory 总结历史对话")
    print("*" * 50)

    # 创建一个总结记忆对象
    memory = ConversationSummaryMemory(llm=llm)

    # 创建带有总结记忆的对话链
    conversation = ConversationChain(llm=llm, memory=memory, verbose=True)

    # 进行多轮对话
    queries = [
        "我叫张三，是一名大学生",
        "我在学习计算机科学",
        "我想开发一个AI应用，你有什么建议吗？",
        "谢谢你的建议，我还对机器学习特别感兴趣",
    ]

    for i, query in enumerate(queries):
        print(f"\n第{i+1}轮对话:")
        print(f"用户: {query}")
        response = conversation.predict(input=query)
        print(f"AI: {response}")

        # 显示当前对话总结
        print("\n当前对话总结:")
        print(memory.load_memory_variables({})["history"])

    print("*" * 50)


# 注: 用 qwen-plus 跑不了此 demo，qwen-plus 的 llm 没有提供 get_num_tokens 等方法
def demo4_token_buffer_memory():
    """示例 4: 使用 ConversationTokenBufferMemory 限制token数量"""
    print("*" * 50)
    print("示例 4: 使用 ConversationTokenBufferMemory 限制token数量")
    print("*" * 50)

    # 创建一个基于token的记忆对象，限制最大token数为150
    # 模型名称用于计算token数量
    # 如果超出 token，langChain 可能有这些策略（删除最早的消息、成对删除、保留最新信息、无损压缩）
    memory = ConversationTokenBufferMemory(llm=llm, max_token_limit=150)

    # 添加一些较长的对话历史
    memory.chat_memory.add_user_message(
        "你好，我是王五，一名对人工智能非常感兴趣的高中生。"
    )
    memory.chat_memory.add_ai_message(
        "你好王五！很高兴认识你。人工智能是一个非常有趣的领域，有什么具体的问题我可以帮助你解答吗？"
    )
    memory.chat_memory.add_user_message(
        "我想了解一下深度学习和机器学习的区别，以及如何开始学习这些内容。"
    )
    memory.chat_memory.add_ai_message(
        "机器学习是人工智能的一个子领域，它允许计算机系统从数据中学习而不需要明确编程。深度学习则是机器学习的一个子集，它使用多层神经网络处理复杂数据。如果你想开始学习，建议先掌握Python编程基础，然后学习数学（线性代数、概率论）和基本的机器学习算法，再过渡到深度学习框架如TensorFlow或PyTorch。"
    )

    # 创建带有token限制记忆的对话链
    conversation = ConversationChain(llm=llm, memory=memory, verbose=True)

    # 查看初始记忆
    print("初始记忆内容:")
    print(memory.load_memory_variables({}))

    # 添加更多对话，观察token限制效果
    queries = [
        "我想创建一个图像识别项目，需要什么技术？",
        "我应该选择TensorFlow还是PyTorch？为什么？",
        "这些框架的安装方法是什么？",
    ]

    for i, query in enumerate(queries):
        print(f"\n第{i+1}轮对话:")
        print(f"用户: {query}")
        response = conversation.predict(input=query)
        print(f"AI: {response}")

        # 显示当前记忆中的token数
        print("\n当前记忆内容:")
        current_memory = memory.load_memory_variables({})["history"]
        print(current_memory)
        print(f"预估token数: {llm.get_num_tokens(current_memory)}")

    print("*" * 50)


def demo5_custom_memory_integration():
    # 此 demo 主要展示如何手动构建一个类似于 ConversationChain 的组件
    # 这种方法给了开发者更多控制权，可以自定义对话流和消息结构，特别是在使用现代聊天模型时
    """示例 5: 将内存集成到自定义聊天链中"""
    print("*" * 50)
    print("示例 5: 将内存集成到自定义聊天链中")
    print("*" * 50)

    # 创建一个buffer记忆对象
    memory = ConversationBufferMemory(return_messages=True)

    # 使用ChatPromptTemplate创建一个更灵活的提示模板
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "你是一个友好的AI助手，名叫帮帮，专注于提供简短、准确的回答。你应该记住用户提供的信息，并在回答中个性化回应。",
            ),
            # 创建 ChatPromptTemplate 时，它表示在这个位置将插入对话历史消息
            MessagesPlaceholder(variable_name="history"),
            ("human", "{input}"),
        ]
    )

    # 创建自定义链
    from langchain.chains import LLMChain

    # 流程
    # chain.predict(input=xx) 调用时，LLMChain 先调用 memory.load_memory_variables()
    # 返回一个 { history: [xx] } 的 dict，然后 llm 将其与 input 合并，形成 { history: xx, input: xxx }
    # dict 被用来填充 prompt，history 填充到 MessagesPlaceholder 的 history，input 填充到 HumanMessage 的 input
    chain = LLMChain(llm=llm, prompt=prompt, memory=memory, verbose=True)

    # 进行多轮对话
    conversations = [
        "你好，我是赵六，一名软件工程师",
        "我正在开发一个聊天机器人应用",
        "你能帮我想一些测试用例吗？",
        "你还记得我是做什么工作的吗？",
    ]

    for i, user_input in enumerate(conversations):
        print(f"\n第{i+1}轮对话:")
        print(f"用户: {user_input}")
        response = chain.predict(input=user_input)
        print(f"帮帮: {response}")

    # 显示最终的记忆状态
    print("\n最终记忆状态:")
    messages = memory.chat_memory.messages
    for i, msg in enumerate(messages):
        sender = "用户" if isinstance(msg, HumanMessage) else "帮帮"
        print(f"{i+1}. {sender}: {msg.content}")

    print("*" * 50)


if __name__ == "__main__":
    # 用户可以选择运行特定的 demo
    import argparse

    parser = argparse.ArgumentParser(description="运行 LangChain Memory 示例")
    parser.add_argument(
        "--demo",
        type=int,
        choices=[1, 2, 3, 4, 5],
        help="选择要运行的 demo: 1=ConversationBufferMemory, 2=ConversationBufferWindowMemory, 3=ConversationSummaryMemory, 4=ConversationTokenBufferMemory, 5=自定义内存集成",
    )
    args = parser.parse_args()

    if args.demo == 1:
        demo1_conversation_buffer_memory()
    elif args.demo == 2:
        demo2_conversation_window_memory()
    elif args.demo == 3:
        demo3_conversation_summary_memory()
    elif args.demo == 4:
        demo4_token_buffer_memory()
    elif args.demo == 5:
        demo5_custom_memory_integration()
    else:
        # 默认运行所有 demo
        print("运行所有示例...")
        demo1_conversation_buffer_memory()
        demo2_conversation_window_memory()
        demo3_conversation_summary_memory()
        demo4_token_buffer_memory()
        demo5_custom_memory_integration()
