"""
Output Parsers - 将LLM的文本输出转换为结构化数据

LangChain提供了多种输出解析器，可以将LLM的自然语言输出转换为特定格式：
1. JsonOutputParser - 解析为JSON格式
2. PydanticOutputParser - 解析为Pydantic模型
3. CommaSeparatedListOutputParser - 解析为逗号分隔的列表
"""

import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

from langchain_core.output_parsers import (
    JsonOutputParser,
    CommaSeparatedListOutputParser,
    PydanticOutputParser,
)
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from typing import List


def demo1_json_parser():
    """示例1: 使用JsonOutputParser解析JSON格式输出"""
    print("*" * 50)
    print("示例1: 使用JsonOutputParser解析JSON格式输出")
    print("*" * 50)

    # 创建一个JSON输出解析器
    json_parser = JsonOutputParser()

    # 创建一个提示模板，告诉LLM返回JSON格式
    prompt = PromptTemplate.from_template(
        """请你提供一个关于{topic}的详细信息，包括以下字段：
        1. name: {topic}的名称
        2. description: 简短描述
        3. features: 主要特点（数组）
        4. advantages: 优势（数组）
        
        {format_instructions}
        """
    )

    # 组合提示模板和格式说明
    # 可以理解为先预传了 format_instructions 参数（有点像 JS 的柯里化？）
    # 这样就不用每次都传 invoke({"topic": "LangChain", "format_instructions": json_parser.get_format_instructions()}) 了
    # JsonOutputParser 告诉 llm 如何格式化它的输出
    # JsonOutputParser 的格式指令见 README.md
    prompt_with_format = prompt.partial(
        format_instructions=json_parser.get_format_instructions()
    )

    # 创建链式调用
    chain = prompt_with_format | llm | json_parser

    # 执行链式调用并获取结果
    result = chain.invoke({"topic": "LangChain"})
    print(f"类型: {type(result)}")
    print(f"内容: {result}")
    print(f"特点: {result['features']}")  # 可以像字典一样访问
    print("*" * 50)


def demo2_pydantic_parser():
    """示例2: 使用PydanticOutputParser解析为Python对象"""
    print("*" * 50)
    print("示例2: 使用PydanticOutputParser解析为Python对象")
    print("*" * 50)

    # 定义一个Pydantic模型
    class Technology(BaseModel):
        name: str = Field(description="技术的名称")
        description: str = Field(description="技术的简短描述")
        use_cases: List[str] = Field(description="技术的应用场景列表")
        learning_difficulty: str = Field(description="学习难度: Easy, Medium, Hard")

    # 创建一个Pydantic输出解析器
    pydantic_parser = PydanticOutputParser(pydantic_object=Technology)

    # 创建提示模板
    prompt_template = """请提供关于{technology}的信息:

    {format_instructions}

    技术: {technology}
    """

    # 创建提示
    prompt = PromptTemplate(
        template=prompt_template,
        input_variables=["technology"],
        partial_variables={
            "format_instructions": pydantic_parser.get_format_instructions()
        },
    )

    # 执行并获取结果
    formatted_prompt = prompt.format(technology="Python")
    print("提示:\n", formatted_prompt)

    response = llm.invoke(formatted_prompt)
    print("原始输出:\n", response.content)

    # 解析响应
    tech_data = pydantic_parser.parse(response.content)
    print("解析后的对象类型:", type(tech_data))
    print("名称:", tech_data.name)
    print("描述:", tech_data.description)
    print("使用场景:", tech_data.use_cases)
    print("学习难度:", tech_data.learning_difficulty)
    print("*" * 50)


def demo3_list_parser():
    """示例3: 使用CommaSeparatedListOutputParser解析列表"""
    print("*" * 50)
    print("示例3: 使用CommaSeparatedListOutputParser解析列表")
    print("*" * 50)

    # 创建逗号分隔列表解析器
    list_parser = CommaSeparatedListOutputParser()

    # 创建提示模板
    list_prompt = PromptTemplate.from_template(
        """列出{topic}的前五个重要组件，以逗号分隔。

    {format_instructions}
        """
    )

    # 组合提示和格式指令
    list_prompt_with_format = list_prompt.partial(
        format_instructions=list_parser.get_format_instructions()
    )

    # 创建链式调用
    list_chain = list_prompt_with_format | llm | list_parser

    # 执行链式调用
    components = list_chain.invoke({"topic": "LangChain"})
    print(f"类型: {type(components)}")
    print(f"解析后的列表: {components}")

    # 可以直接使用列表操作
    for i, component in enumerate(components, 1):
        print(f"{i}. {component}")

    print("*" * 50)


if __name__ == "__main__":
    # 用户可以选择运行特定的demo
    import argparse

    parser = argparse.ArgumentParser(description="运行LangChain OutputParser示例")
    parser.add_argument(
        "--demo",
        type=int,
        choices=[1, 2, 3],
        help="选择要运行的demo: 1=JSON解析器, 2=Pydantic解析器, 3=列表解析器",
    )
    args = parser.parse_args()

    if args.demo == 1:
        demo1_json_parser()
    elif args.demo == 2:
        demo2_pydantic_parser()
    elif args.demo == 3:
        demo3_list_parser()
    else:
        # 默认运行所有demo
        print("运行所有示例...")
        demo1_json_parser()
        demo2_pydantic_parser()
        demo3_list_parser()
