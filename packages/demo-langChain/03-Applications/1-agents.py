"""
Agents - 智能代理，能够根据用户需求自主选择和使用工具

LangChain 中的 Agents 是一种更高级的抽象，它能够:
1. 理解用户的请求并制定解决方案
2. 动态选择最合适的工具来解决问题
3. 执行工具调用并解析结果
4. 迭代优化直到解决问题

主要类型的 Agents:
1. ReAct Agent - 基于 ReAct (Reasoning + Acting) 范式，在思考和行动之间交替
2. OpenAI Functions Agent - 使用 OpenAI 的函数调用能力创建的智能体
3. Conversational Agent - 专为对话设计的智能体，可以记住对话历史
4. Plan-and-Execute Agent - 先规划后执行的智能体，处理复杂任务
5. SQL Agent - 专门处理 SQL 查询的智能体

使用场景:
- 复杂问题解决: 将大问题分解为小步骤，动态使用不同工具
- 对话系统: 构建可以使用工具的对话助手
- 自动化工作流: 根据用户输入执行一系列操作
- 数据分析: 以自然语言请求分析数据
"""

import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

from langchain.agents import (
    AgentExecutor,
    create_react_agent,
    create_openai_functions_agent,
)
from langchain.agents import AgentType, initialize_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import tool
from langchain_core.messages import AIMessage, HumanMessage
import math
from datetime import datetime
from typing import List


def demo1_simple_react_agent():
    """示例 1: 创建一个简单的 ReAct Agent"""
    print("*" * 50)
    print("示例 1: 创建一个简单的 ReAct Agent")
    print("*" * 50)

    # 定义一些简单的工具
    @tool
    def calculator(expression: str) -> str:
        """对于表达式求值，如'2 + 2'或'sin(pi/4)'等数学表达式"""
        try:
            # 安全执行表达式
            result = eval(expression, {"__builtins__": {}}, {"math": math})
            return f"{result}"
        except Exception as e:
            return f"计算错误: {str(e)}"

    @tool
    def get_current_time(format_string: str = "%Y-%m-%d %H:%M:%S") -> str:
        """获取当前时间，可以指定时间格式，如 '%Y-%m-%d' 只返回日期"""
        return datetime.now().strftime(format_string)

    @tool
    def convert_units(conversion_query: str) -> str:
        """将一个单位转换为另一个单位，格式：'数量 原单位 to 目标单位'，例如 '5.2 m to cm'"""
        try:
            # 解析输入字符串
            parts = conversion_query.split()
            if len(parts) < 4 or parts[2].lower() != "to":
                return "格式错误，请使用类似 '5.2 m to cm' 的格式"

            amount = float(parts[0])
            from_unit = parts[1].lower()
            to_unit = parts[3].lower()

            # 单位转换表
            units = {
                "m": 1,  # 米
                "km": 1000,  # 千米
                "cm": 0.01,  # 厘米
                "mm": 0.001,  # 毫米
                "ft": 0.3048,  # 英尺
                "in": 0.0254,  # 英寸
            }

            if from_unit in units and to_unit in units:
                result = amount * units[from_unit] / units[to_unit]
                return f"{amount} {from_unit} = {result} {to_unit}"
            else:
                return f"无法转换单位，仅支持：{', '.join(units.keys())}"
        except Exception as e:
            return f"转换错误: {str(e)}，请使用类似 '5.2 m to cm' 的格式"

    # 将工具组合成列表
    tools = [calculator, get_current_time, convert_units]

    # 使用 initialize_agent 创建一个 ZERO_SHOT_REACT_DESCRIPTION 类型的智能体
    # 这是一种适合使用工具的基本智能体类型
    agent_executor = initialize_agent(
        tools=tools,
        llm=llm,
        # Zero-Shot：表示 Agent 不需要任何示例就能执行任务。它可以直接根据提供的工具描述和指令来操作，无需事先学习或见过类似的任务
        # ReAct：代表 "Reasoning + Acting"（推理+行动）的组合，是一种先推理后行动的范式。这种范式让 AI 在采取行动前先思考问题，然后采取行动，观察结果，再根据结果继续思考
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True,
        handle_parsing_errors=True,
    )

    # 执行智能体
    # 流程：
    # 1、langChain agent 将信息组装成一个 prompt
    # 你是一个能够使用工具解决问题的智能助手。
    # 请根据用户的问题，选择合适的工具来解决。
    # Tool 1: "calculator" - 对于表达式求值，如'2 + 2'或'sin(pi/4)'等数学表达式
    # Tool 2: "get_current_time" - 获取当前时间，可以指定时间格式，如 '%Y-%m-%d' 只返回日期
    # Tool 3: "convert_units" - 将一个单位转换为另一个单位，格式：'数量 原单位 to 目标单位'，例如 '5.2 m to cm'
    # 使用以下格式:
    # Thought: 你对问题的思考
    # Action: 工具名称
    # Action Input: 工具的输入参数
    # Observation: 工具的输出结果(这会由系统提供)
    # ... (思考和行动可以重复多次)
    # Thought: 我现在知道最终答案了
    # Final Answer: 最终对用户问题的回答
    # 用户问题: 今天的日期是什么？并计算 123 * 456 的结果，然后告诉我 5.2 米等于多少厘米？

    # 2、llm 执行后返回：
    # 我需要分别使用 get_current_time、calculator 和 convert_units 来获取今天的日期、计算乘法结果以及进行单位转换。
    # Action: get_current_time
    # Action Input: '%Y-%m-%d'

    # 3、langChain agent 执行后返回
    # Observation: '2025-04-28'
    # ...
    result = agent_executor.invoke(
        {
            "input": "今天的日期是什么？并计算 123 * 456 的结果，然后告诉我 5.2 米等于多少厘米？"
        }
    )
    print("\n最终回答:")
    print(result["output"])
    print("*" * 50)


def demo2_openai_functions_agent():
    """示例 2: 创建一个 OpenAI Functions Agent"""
    print("*" * 50)
    print("示例 2: 创建一个 OpenAI Functions Agent")
    print("*" * 50)

    # 创建一个天气工具
    @tool
    def get_weather(location: str, unit: str = "celsius") -> str:
        """获取指定位置的天气信息"""
        # 模拟天气数据，实际应用中应调用真实天气 API
        weather_data = {
            "北京": {"温度": 26, "天气": "晴朗", "湿度": 40},
            "上海": {"温度": 30, "天气": "多云", "湿度": 65},
            "广州": {"温度": 33, "天气": "小雨", "湿度": 80},
            "纽约": {"温度": 22, "天气": "晴朗", "湿度": 55},
            "伦敦": {"温度": 18, "天气": "阴天", "湿度": 70},
        }

        if location in weather_data:
            data = weather_data[location]
            temp = data["温度"]
            if unit.lower() == "fahrenheit":
                temp = temp * 9 / 5 + 32
                temp_unit = "°F"
            else:
                temp_unit = "°C"
            return f"{location}的天气: {data['天气']}, 温度: {temp}{temp_unit}, 湿度: {data['湿度']}%"
        return f"无法获取{location}的天气信息"

    # 创建一个旅游建议工具
    @tool
    def travel_tips(city: str) -> str:
        """获取指定城市的旅游建议"""
        tips = {
            "北京": "北京是中国的首都，著名景点包括故宫、长城、天坛等。建议至少安排 3-5 天游览。",
            "上海": "上海是中国的经济中心，著名景点包括外滩、豫园、迪士尼乐园等。建议 2-4 天游览。",
            "广州": "广州是岭南文化的中心，著名景点包括陈家祠、白云山、沙面等。建议 2-3 天游览。",
            "杭州": "杭州以西湖闻名，有'上有天堂，下有苏杭'的美誉。著名景点包括西湖、灵隐寺等。建议 2-3 天游览。",
            "西安": "西安是中国古都，著名景点包括兵马俑、城墙、大雁塔等。建议 2-4 天游览。",
        }

        if city in tips:
            return tips[city]
        return f"暂无关于{city}的旅游信息。"

    # 创建一个餐厅推荐工具
    @tool
    def restaurant_recommendation(city: str, cuisine_type: str = "当地特色") -> str:
        """根据城市和料理类型推荐餐厅"""
        # 简单的餐厅推荐数据
        recommendations = {
            "北京": {
                "当地特色": ["全聚德烤鸭", "老舍茶馆", "东来顺"],
                "火锅": ["海底捞", "小龙坎", "大龙燚"],
                "西餐": ["TRB Hutong", "京兆尹", "晓晓椰子鸡"],
            },
            "上海": {
                "当地特色": ["南翔小笼", "绿波廊", "松鹤楼"],
                "火锅": ["海底捞", "蜀大侠", "德庄"],
                "西餐": ["Mr & Mrs Bund", "Ultraviolet", "Jean Georges"],
            },
        }

        if city in recommendations and cuisine_type in recommendations[city]:
            rests = recommendations[city][cuisine_type]
            return f"{city}的{cuisine_type}餐厅推荐: {', '.join(rests)}"
        return f"无法为{city}的{cuisine_type}提供餐厅推荐。"

    # 组合工具
    tools = [get_weather, travel_tips, restaurant_recommendation]

    # 创建 OpenAI Functions Agent 的提示模板
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                """你是一个旅行助手，可以帮助用户规划旅行。
你可以提供天气信息、旅游建议和餐厅推荐。
始终使用提供的工具回答问题，不要编造答案。
如果工具没有返回信息，坦诚地告诉用户你无法获取该信息。""",
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            # agent 的"草稿本"，用于记录 agent 的思考过程和工具调用
            # 它记录了 agent 如何思考问题、选择工具、调用工具和观察结果的过程
            # 这个变量不需要手动提供，是由 LangChain 的 AgentExecutor 在内部自动管理的
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )

    # 创建 OpenAI Functions Agent
    agent = create_openai_functions_agent(llm, tools, prompt)

    # 创建智能体执行器
    agent_executor = AgentExecutor(
        agent=agent, tools=tools, verbose=True, handle_parsing_errors=True
    )

    # 模拟对话历史
    chat_history = [
        HumanMessage(content="我想去北京旅游"),
        AIMessage(
            content="北京是个很好的选择！您想了解北京的什么信息呢？我可以为您提供天气、旅游建议和餐厅推荐。"
        ),
    ]

    # 执行智能体，包含对话历史
    result = agent_executor.invoke(
        {
            "input": "北京现在的天气怎么样？有什么好玩的地方推荐？我喜欢吃火锅，有推荐的餐厅吗？",
            "chat_history": chat_history,
        }
    )

    print("\n最终回答:")
    print(result["output"])
    print("*" * 50)


def demo3_conversational_agent():
    """示例 3: 创建一个会话智能体并处理多轮对话"""
    print("*" * 50)
    print("示例 3: 创建一个会话智能体并处理多轮对话")
    print("*" * 50)

    # 创建一些简单的数据查询工具
    @tool
    def search_product(product_name: str) -> str:
        """搜索商品信息"""
        products = {
            "手机": "我们有多种型号的手机，包括 iPhone 15、三星 Galaxy S23 和小米 14。价格从 3000 元到 8000 元不等。",
            "笔记本电脑": "我们有 MacBook、ThinkPad 和华为 MateBook 等多个品牌的笔记本电脑。价格从 5000 元到 15000 元不等。",
            "平板电脑": "我们有 iPad、三星 Galaxy Tab 和华为 MatePad 等平板电脑。价格从 2000 元到 8000 元不等。",
            "耳机": "我们有有线耳机和无线耳机，品牌包括 AirPods、索尼和 Bose 等。价格从 200 元到 2000 元不等。",
        }

        # 模糊匹配
        for key in products:
            if key in product_name or product_name in key:
                return products[key]

        return f"很抱歉，我们没有关于 '{product_name}' 的信息。"

    @tool
    def check_stock(product_name: str) -> str:
        """检查商品库存"""
        # 模拟库存数据
        stock = {
            "iphone": "iPhone 15 目前有库存，所有颜色都可用。",
            "三星": "三星 Galaxy S23 库存有限，仅剩黑色和白色。",
            "小米": "小米 14 目前缺货，预计下周到货。",
            "macbook": "MacBook Pro 有库存，但 MacBook Air 缺货。",
            "ipad": "所有型号的 iPad 都有充足库存。",
            "airpods": "AirPods Pro 有库存，普通 AirPods 缺货。",
        }

        # 简单的关键词匹配
        for key in stock:
            if key.lower() in product_name.lower():
                return stock[key]

        return f"无法检查 '{product_name}' 的库存状态，请提供更具体的商品名称。"

    @tool
    def get_discount_info() -> str:
        """获取当前促销和折扣信息"""
        # 模拟促销信息
        return """当前促销活动：
1. 购买手机满 5000 元减 500 元
2. 笔记本电脑全场 9 折
3. 耳机买一送一
4. 平板电脑赠送保护套和贴膜
5. 会员额外享受 95 折优惠"""

    # 组合工具
    tools = [search_product, check_stock, get_discount_info]

    # 创建会话智能体的提示模板，包含对话历史
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                """你是一个电子产品商店的客服助手，可以回答顾客关于产品、库存和促销的问题。
使用提供的工具来获取信息，不要编造答案。
如果你不知道答案，请诚实地告诉顾客并提供其他可能的帮助方式。
保持友好和专业的态度，使用礼貌的语气。""",
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )

    # 创建 Agent
    agent = create_openai_functions_agent(llm, tools, prompt)

    # 创建 Agent 执行器
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

    # 模拟多轮对话
    chat_history = []

    # 第一轮对话
    user_input = "你们店里有什么手机？"
    print(f"\n用户: {user_input}")

    result = agent_executor.invoke({"input": user_input, "chat_history": chat_history})

    print(f"助手: {result['output']}")

    # 更新对话历史
    chat_history.append(HumanMessage(content=user_input))
    chat_history.append(AIMessage(content=result["output"]))

    # 第二轮对话
    user_input = "iPhone 15 有现货吗？"
    print(f"\n用户: {user_input}")

    result = agent_executor.invoke({"input": user_input, "chat_history": chat_history})

    print(f"助手: {result['output']}")

    # 更新对话历史
    chat_history.append(HumanMessage(content=user_input))
    chat_history.append(AIMessage(content=result["output"]))

    # 第三轮对话
    user_input = "有什么优惠活动吗？"
    print(f"\n用户: {user_input}")

    result = agent_executor.invoke({"input": user_input, "chat_history": chat_history})

    print(f"助手: {result['output']}")
    print("*" * 50)


if __name__ == "__main__":
    # 用户可以选择运行特定的 demo
    # python3/python ./03-Applications/1-agents.py --demo 1
    import argparse

    parser = argparse.ArgumentParser(description="运行 LangChain Agents 示例")
    parser.add_argument(
        "--demo",
        type=int,
        choices=[1, 2, 3],
        help="选择要运行的 demo: 1=ReAct Agent, 2=OpenAI Functions Agent, 3=Conversational Agent",
    )
    args = parser.parse_args()

    if args.demo == 1:
        demo1_simple_react_agent()
    elif args.demo == 2:
        demo2_openai_functions_agent()
    elif args.demo == 3:
        demo3_conversational_agent()
    else:
        # 默认运行所有 demo
        print("运行所有示例...")
        demo1_simple_react_agent()
        demo2_openai_functions_agent()
        demo3_conversational_agent()
