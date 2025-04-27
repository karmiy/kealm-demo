"""
Tools - 使 LLM 能够使用外部工具和 API

LangChain 中的工具是一种让 LLM 与外部世界交互的方式，一般与 Agent 配合使用，允许模型:
1. 执行计算
2. 调用外部 API
3. 检索信息
4. 与其他系统集成

本模块提供以下工具类型和创建方法:
1. Tool - 最基本的工具类，包装任何函数为 LLM 可调用的工具
2. @tool 装饰器 - 快速将函数转换为工具的简便方法
3. BaseTool - 用于创建复杂工具的基类，支持同步 (_run) 和异步 (_arun) 调用
4. StructuredTool - 支持结构化输入参数的工具，提供类型安全

使用场景:
- 数学计算: 执行数学运算而无需 LLM 自行计算
- 数据检索: 从外部数据源获取信息 (如搜索引擎、数据库)
- API 集成: 调用外部服务和 API (如天气服务、股票数据)
- 文件操作: 读写文件和处理文档
- 代码执行: 运行代码片段并返回结果
- 日期和时间操作: 处理日期、时间相关的功能

工具调用流程:
1. 定义工具 (通过函数、装饰器或自定义类)
2. 配置工具 (名称、描述、参数)
3. 调用工具 (tool.invoke 或与 LLM 集成)
4. 处理结果
"""

import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from langchain.tools import BaseTool, StructuredTool, tool
from langchain_core.tools import Tool
import math
import requests
from datetime import datetime
from typing import Dict, List, Optional, Type
from pydantic import BaseModel


def demo1_basic_calculator_tool():
    """示例 1: 使用简单的计算器工具"""
    print("*" * 50)
    print("示例 1: 使用简单的计算器工具")
    print("*" * 50)

    # 定义一个简单的计算器函数
    def calculator(expression: str) -> str:
        """计算数学表达式"""
        try:
            # 安全地执行表达式求值
            # 注意: 在生产环境中应该更谨慎处理，这里为了演示简化了
            # {"__builtins__": {}} 移除了对所有内置函数的访问（如 open, exec, __import__ 等），防止可能的代码注入攻击
            # {"math": math} 沙箱环境添加了 math 模块，确保数学函数可用
            result = eval(expression, {"__builtins__": {}}, {"math": math})
            return f"计算结果: {result}"
        except Exception as e:
            return f"计算错误: {str(e)}"

    # 创建一个工具
    calculator_tool = Tool(
        name="Calculator",
        description="用于计算数学表达式，如加减乘除、三角函数等。输入应该是一个有效的 Python 数学表达式",
        func=calculator,
    )

    # 演示工具的使用
    expressions = [
        "2 + 2",
        "10 * 5",
        "math.sin(math.pi/2)",
        "math.sqrt(16)",
    ]

    for expr in expressions:
        print(f"\n计算: {expr}")
        result = calculator_tool.invoke(expr)
        print(result)

    print("*" * 50)


def demo2_custom_tools():
    """示例 2: 装饰器 @tool、BaseTool、StructuredTool 创建和使用自定义工具"""
    print("*" * 50)
    print("示例 2: 创建和使用自定义工具")
    print("*" * 50)

    # 方法 1: 使用 @tool 装饰器创建工具
    @tool
    def date_tool(format_string: str = "%Y-%m-%d %H:%M:%S") -> str:
        """返回当前日期和时间，可选择格式。默认格式为 '%Y-%m-%d %H:%M:%S'"""
        return datetime.now().strftime(format_string)

    # 方法 2: 从 BaseTool 继承创建更复杂的工具
    class WeatherTool(BaseTool):
        name: str = "WeatherTool"
        description: str = "获取指定城市的天气信息"

        def _run(self, city: str) -> str:
            """获取城市天气 (模拟 API 调用)"""
            # 注意: 这是一个模拟，实际应用中会调用真实的天气 API
            weather_data = {
                "北京": {"温度": "26°C", "天气": "晴朗", "湿度": "40%"},
                "上海": {"温度": "30°C", "天气": "多云", "湿度": "65%"},
                "广州": {"温度": "33°C", "天气": "小雨", "湿度": "80%"},
                "深圳": {"温度": "32°C", "天气": "阴天", "湿度": "75%"},
            }

            if city in weather_data:
                data = weather_data[city]
                return f"{city}的天气: {data['天气']}, 温度: {data['温度']}, 湿度: {data['湿度']}"
            return f"无法获取{city}的天气信息"

        def _arun(self, city: str):
            """异步版本的 _run (这里简单地调用同步方法)"""
            return self._run(city)

    # 方法 3: 使用 StructuredTool 创建具有类型化参数的工具
    # 定义接收单独参数的翻译函数
    def translate_text(text: str, target_language: str, formal: bool) -> str:
        """将文本翻译成目标语言，支持正式/非正式风格"""
        # 注意: 这是一个模拟，实际应用中会调用真实的翻译 API
        translations = {
            "en": {
                "你好": {"formal": "Hello", "informal": "Hi"},
                "谢谢": {"formal": "Thank you", "informal": "Thanks"},
                "再见": {"formal": "Goodbye", "informal": "Bye"},
            },
            "ja": {
                "你好": {"formal": "こんにちは", "informal": "やあ"},
                "谢谢": {"formal": "ありがとうございます", "informal": "ありがとう"},
                "再见": {"formal": "さようなら", "informal": "バイバイ"},
            },
            "fr": {
                "你好": {"formal": "Bonjour", "informal": "Salut"},
                "谢谢": {"formal": "Merci beaucoup", "informal": "Merci"},
                "再见": {"formal": "Au revoir", "informal": "Salut"},
            },
        }

        if target_language in translations and text in translations[target_language]:
            style = "formal" if formal else "informal"
            return f"翻译结果: {translations[target_language][text][style]} ({style})"
        return f"无法翻译文本 '{text}' 到 {target_language}"

    # 使用 StructuredTool 创建工具
    translate_tool = StructuredTool.from_function(
        func=translate_text,
        name="TranslateText",
        description="将文本翻译成目标语言，支持正式/非正式风格",
    )

    # 初始化工具
    weather_tool = WeatherTool()

    # 演示工具的使用
    print("\n当前日期和时间:")
    print(date_tool.invoke(""))  # 使用默认格式
    print(date_tool.invoke("%A, %B %d, %Y"))

    print("\n城市天气信息:")
    print(weather_tool.invoke("北京"))
    print(weather_tool.invoke("上海"))

    print("\n文本翻译 (使用 StructuredTool):")
    print(
        translate_tool.invoke({"text": "你好", "target_language": "en", "formal": True})
    )
    print(
        translate_tool.invoke(
            {"text": "谢谢", "target_language": "ja", "formal": False}
        )
    )
    print(
        translate_tool.invoke({"text": "再见", "target_language": "fr", "formal": True})
    )
    print(
        translate_tool.invoke(
            {"text": "再见", "target_language": "fr", "formal": False}
        )
    )

    print("*" * 50)


def demo3_tools_with_llm():
    """示例 3: 将工具与 LLM 结合使用"""
    print("*" * 50)
    print("示例 3: 将工具与 LLM 结合使用")
    print("*" * 50)

    # 创建几个简单的工具
    @tool
    def search_wikipedia(query: str) -> str:
        """搜索维基百科上的信息 (模拟功能)"""
        # 注意: 这是一个模拟，实际应用中会使用维基百科 API
        wiki_data = {
            "人工智能": "人工智能（AI）是计算机科学的一个分支，致力于创建能够模拟人类智能的系统。",
            "机器学习": "机器学习是人工智能的一个子领域，专注于使用数据和算法来模仿人类学习方式，逐步提高其准确性。",
            "深度学习": "深度学习是机器学习的一种特定形式，使用神经网络来处理和学习复杂模式。",
            "python": "Python 是一种高级编程语言，以其简洁的语法和可读性而闻名，广泛用于 Web 开发、数据分析、AI 和科学计算。",
        }
        return wiki_data.get(query, f"在维基百科上找不到关于 '{query}' 的信息")

    @tool
    def get_current_weather(location: str) -> str:
        """获取指定位置的当前天气 (模拟功能)"""
        weather_info = {
            "北京": "北京: 晴朗, 26°C",
            "上海": "上海: 多云, 30°C",
            "纽约": "纽约: 小雨, 22°C",
            "伦敦": "伦敦: 阴天, 18°C",
        }
        return weather_info.get(location, f"无法获取 {location} 的天气信息")

    # 使用 PromptTemplate 和 LLMChain 将工具与 LLM 结合
    tools_prompt = PromptTemplate(
        input_variables=["query", "wikipedia_result", "weather_result"],
        template="""
请回答以下问题，使用提供的工具查询结果:

问题: {query}

维基百科搜索结果: {wikipedia_result}
天气信息: {weather_result}

请综合这些信息提供一个友好、信息丰富的回答:
""",
    )

    tools_chain = LLMChain(llm=llm, prompt=tools_prompt)

    # 演示使用工具与 LLM
    queries = [
        "什么是人工智能?",
        "今天北京天气怎么样?",
        "告诉我关于 Python 编程语言的信息",
    ]

    for query in queries:
        print(f"\n问题: {query}")

        # 确定需要使用哪个工具
        if "天气" in query:
            location = "北京" if "北京" in query else "上海"
            wikipedia_result = "无相关维基百科信息"
            weather_result = get_current_weather.invoke(location)
        else:
            search_term = "人工智能" if "人工智能" in query else "python"
            wikipedia_result = search_wikipedia.invoke(search_term)
            weather_result = "无相关天气信息"

        # 使用 LLM 整合信息
        response = tools_chain.invoke(
            {
                "query": query,
                "wikipedia_result": wikipedia_result,
                "weather_result": weather_result,
            }
        )

        print(f"回答: {response['text']}")

    print("*" * 50)


def demo4_external_api_tool():
    """示例 4: 使用外部 API 工具"""
    print("*" * 50)
    print("示例 4: 使用外部 API 工具 (模拟版本)")
    print("*" * 50)

    # 创建一个调用外部 API 的工具
    @tool
    def fetch_stock_price(symbol: str) -> str:
        """获取股票价格信息 (模拟版本)"""
        # 注意: 在实际应用中，这里会调用真实的股票 API
        # 例如 Alpha Vantage, Yahoo Finance 等

        # 为了演示，使用模拟数据
        stock_data = {
            "AAPL": {"price": 182.52, "change": "+1.25%", "company": "Apple Inc."},
            "MSFT": {
                "price": 415.38,
                "change": "-0.38%",
                "company": "Microsoft Corporation",
            },
            "GOOG": {"price": 173.29, "change": "+0.84%", "company": "Alphabet Inc."},
            "AMZN": {
                "price": 187.63,
                "change": "+0.55%",
                "company": "Amazon.com, Inc.",
            },
            "TSLA": {"price": 248.50, "change": "-1.02%", "company": "Tesla, Inc."},
        }

        if symbol in stock_data:
            data = stock_data[symbol]
            return f"{data['company']} ({symbol}): ${data['price']} {data['change']}"
        return f"无法获取股票代码 {symbol} 的价格信息"

    # 示例提示模板
    stock_prompt = PromptTemplate(
        input_variables=["symbol", "stock_info"],
        template="""
请分析以下股票信息，并提供简短的市场评论:

股票: {symbol}
数据: {stock_info}

分析:
""",
    )

    stock_chain = LLMChain(llm=llm, prompt=stock_prompt)

    # 演示使用外部 API 工具
    stocks = ["AAPL", "MSFT", "TSLA", "UNKNOWN"]

    for stock in stocks:
        print(f"\n获取股票信息: {stock}")

        # 使用工具获取股票信息
        stock_info = fetch_stock_price.invoke(stock)
        print(f"股票数据: {stock_info}")

        # 如果成功获取数据，使用 LLM 分析
        if "无法获取" not in stock_info:
            analysis = stock_chain.invoke({"symbol": stock, "stock_info": stock_info})
            print(f"AI 分析: {analysis['text']}")

    print("*" * 50)


if __name__ == "__main__":
    # 用户可以选择运行特定的 demo
    import argparse

    parser = argparse.ArgumentParser(description="运行 LangChain Tools 示例")
    parser.add_argument(
        "--demo",
        type=int,
        choices=[1, 2, 3, 4],
        help="选择要运行的 demo: 1=基本计算器工具, 2=自定义工具, 3=工具与 LLM 结合使用, 4=外部 API 工具",
    )
    args = parser.parse_args()

    if args.demo == 1:
        demo1_basic_calculator_tool()
    elif args.demo == 2:
        demo2_custom_tools()
    elif args.demo == 3:
        demo3_tools_with_llm()
    elif args.demo == 4:
        demo4_external_api_tool()
    else:
        # 默认运行所有 demo
        print("运行所有示例...")
        demo1_basic_calculator_tool()
        demo2_custom_tools()
        demo3_tools_with_llm()
        demo4_external_api_tool()
