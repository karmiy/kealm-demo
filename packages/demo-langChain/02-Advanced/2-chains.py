"""
Chains - 将多个组件（如提示模板、语言模型、输出解析器等）组合起来，构建复杂的处理流程

LangChain 提供了多种链类型，用于构建不同的处理流程：
1. LLMChain - 最基本的链，将提示模板和语言模型结合
2. SequentialChain - 顺序执行多个链，前一个链的输出作为后一个链的输入
3. SimpleSequentialChain - 简化版的顺序链，每个链只有一个输入和一个输出，SimpleSequentialChain 会自动将传入的字符串转为 input_variables 的字典，所以才能满足 chain 中需要的 input_variables
4. TransformChain - 使用自定义函数转换数据的链
5. RouterChain - 根据输入内容选择不同的处理路径

类似前面提到的管道用法，如 LLMChain(llm=llm, prompt=prompt) 等于 prompt | llm | StrOutputParser()

使用场景：
- 多步骤推理：将复杂问题分解为多个小步骤，每个步骤使用一个专用链处理
- 数据处理流程：对数据进行预处理、分析和后处理的完整流程
- 上下文增强：逐步丰富查询的上下文信息，提高回答质量
- 条件处理：根据输入或中间结果选择不同的处理路径
- 工具调用链：构建依次调用多种工具的复杂操作


其他：
- output_variables: 明确指定了链返回的最终结果中应该包含哪些变量，没有列在这个列表里的中间变量会被过滤，但输入变量（如下面各个用例里的 text）会被保留，即使不在 output_variables 列表里
- output_key: 指定输出键名，不指定会是 text
"""

import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

from langchain_core.prompts import PromptTemplate, ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.chains import LLMChain, SequentialChain, SimpleSequentialChain, TransformChain


def demo1_llm_chain():
    """示例 1: 使用 LLMChain 构建基本的链"""
    print("*" * 50)
    print("示例 1: 使用 LLMChain 构建基本的链")
    print("*" * 50)

    # 创建一个提示模板
    prompt = PromptTemplate.from_template(
        "请简要介绍{technology}技术，并列出它的三个主要特点。"
    )

    # 创建 LLMChain
    # 方法一：使用 LLMChain 类
    chain = LLMChain(llm=llm, prompt=prompt)
    
    # 运行链并获取结果
    # 步骤:
    # 1. 输入 {"technology": "React"}，执行 prompt
    # 2. 输出 <class 'langchain_core.prompt_values.StringPromptValue'> text='请简要介绍React技术，并列出它的三个主要特点。'
    # 3. 给 llm
    # 4. 输出 "xxxx"
    # result = chain.run(technology="React")
    result = chain.invoke({"technology": "React"})
    print("方法一结果:")
    # 输出的已经是 <class 'str'> 了，LLMChain 的 run 方法内已经 StrOutputParser 输出了
    # 如果这里用的是 invoke，则输出是 <class 'dict'> {'technology': 'React', 'text': 'xxxx'}
    print(type(result), result)
    
    # 方法二：使用管道操作符（|）
    # 这是更现代的方式，实际上功能与上面相同
    # StrOutputParser 将语言模型的响应转换为纯文本字符串
    chain2 = prompt | llm | StrOutputParser()
    result2 = chain2.invoke({"technology": "Vue"})
    print("\n方法二结果:")
    print(result2)
    print("*" * 50)


def demo2_sequential_chain():
    """示例 2: 使用 SequentialChain 顺序执行多个链"""
    print("*" * 50)
    print("示例 2: 使用 SequentialChain 顺序执行多个链")
    print("*" * 50)

    # 第一个链：生成技术介绍
    intro_prompt = PromptTemplate(
        input_variables=["technology"],
        template="请简要介绍{technology}技术的基本概念和用途。"
    )
    intro_chain = LLMChain(
        llm=llm, 
        prompt=intro_prompt, 
        output_key="introduction"  # 指定输出键名，不指定会是 text
    )

    # 第二个链：基于介绍生成优缺点
    pros_cons_prompt = PromptTemplate(
        input_variables=["introduction", "technology"],
        template="基于以下介绍：\n{introduction}\n\n请列出{technology}的三个优点和三个缺点。"
    )
    pros_cons_chain = LLMChain(
        llm=llm, 
        prompt=pros_cons_prompt,
        output_key="pros_cons"  # 指定输出键名
    )

    # 第三个链：给出学习建议
    advice_prompt = PromptTemplate(
        input_variables=["introduction", "pros_cons", "technology"],
        template="基于以下信息：\n介绍：{introduction}\n\n优缺点：{pros_cons}\n\n请给出5点学习{technology}的建议，以及学习路径。"
    )
    advice_chain = LLMChain(
        llm=llm, 
        prompt=advice_prompt,
        output_key="advice"  # 指定输出键名
    )

    # 组合成顺序链
    overall_chain = SequentialChain(
        chains=[intro_chain, pros_cons_chain, advice_chain],
        input_variables=["technology"],
        output_variables=["introduction", "pros_cons", "advice"],
        verbose=True  # 显示执行过程
    )

    # 运行链
    result = overall_chain({"technology": "Python"})
    
    print("\n--- 介绍 ---")
    print(result["introduction"])
    print("\n--- 优缺点 ---")
    print(result["pros_cons"])
    print("\n--- 学习建议 ---")
    print(result["advice"])
    print("*" * 50)


def demo3_simple_sequential_chain():
    """示例 3: 使用 SimpleSequentialChain 构建简单的顺序链"""
    print("*" * 50)
    print("示例 3: 使用 SimpleSequentialChain 构建简单的顺序链")
    print("*" * 50)

    # 注：SimpleSequentialChain 每个 Chain 只有一个输入和一个输出，所以不需要指定 output_key
    # 第一个链：生成技术介绍
    intro_prompt = PromptTemplate(
        input_variables=["topic"],
        template="请用一段话简要介绍{topic}。"
    )
    intro_chain = LLMChain(llm=llm, prompt=intro_prompt)

    # 第二个链：基于介绍生成应用场景
    use_cases_prompt = PromptTemplate(
        input_variables=["introduction"],
        template="基于以下介绍：\n{introduction}\n\n请列出三个具体的应用场景。"
    )
    use_cases_chain = LLMChain(llm=llm, prompt=use_cases_prompt)

    # 第三个链：基于应用场景给出实现方法
    implementation_prompt = PromptTemplate(
        input_variables=["use_cases"],
        template="基于以下应用场景：\n{use_cases}\n\n请提供一个简单的代码示例或实现思路。"
    )
    implementation_chain = LLMChain(llm=llm, prompt=implementation_prompt)

    # 组合成简单顺序链
    # SimpleSequentialChain 会自动将前一个链的输出作为后一个链的输入
    # 只关注最终输出，中间结果不保存
    simple_chain = SimpleSequentialChain(
        chains=[intro_chain, use_cases_chain, implementation_chain],
        verbose=True  # 显示执行过程
    )

    # 运行链
    result = simple_chain.run("机器学习")
    print("\n最终结果:")
    # <class 'str'> 类型
    print(type(result), result)
    print("*" * 50)


def demo4_transform_chain():
    """示例 4: 使用 TransformChain 自定义数据转换"""
    print("*" * 50)
    print("示例 4: 使用 TransformChain 自定义数据转换")
    print("*" * 50)

    # 定义转换函数
    def transform_function(inputs):
        text = inputs["text"]
        # 对输入文本进行处理：转为大写并添加前缀
        transformed_text = f"处理后的输入: {text.upper()}"
        return {"transformed_text": transformed_text}

    # 创建 TransformChain
    # 如 transform_chain.invoke({"text": "hello world"}) 的时候，会被这个输入给到 transform_function
    # transform_function 接收后去 text 字段处理后返回 { "transformed_text": "xxxx" }
    # output_variables 会验证返回的结构包含 transformed_text 字段，否则会报错
    # 最后返回 { "text": "hello world", "transformed_text": "xxxx" }
    transform_chain = TransformChain(
        input_variables=["text"],
        output_variables=["transformed_text"],
        transform=transform_function
    )

    # 输出: 
    # <class 'dict'> {'text': 'hello world', 'transformed_text': '处理后的输入: HELLO WORLD'}
    # print(type(transform_chain.invoke({"text": "hello world"})), transform_chain.invoke({"text": "hello world"}))

    # 创建 LLM 链，使用转换后的文本
    response_prompt = PromptTemplate(
        input_variables=["transformed_text"],
        template="请对以下输入进行分析：\n{transformed_text}"
    )
    # 关键修改：指定输出键名为 "analysis_result"，避免与输入键 "text" 冲突
    response_chain = LLMChain(
        llm=llm, 
        prompt=response_prompt,
        output_key="analysis_result"  # 指定不同的输出键名
    )

    # # 组合链
    chain = SequentialChain(
        chains=[transform_chain, response_chain],
        input_variables=["text"],
        output_variables=["analysis_result"],  # 使用 response_chain 的输出键名
        verbose=True
    )

    # # 运行链
    # 步骤:
    # 1. 输入 {"text": "人工智能正在改变我们的生活"}，执行 transform_chain
    # 2. 输出 {"text": "人工智能正在改变我们的生活", "transformed_text": "处理后的输入: 人工智能正在改变我们的生活"}
    # 3. 执行 response_chain，PromptTemplate 填充 prompt，输出 <class 'langchain_core.prompt_values.StringPromptValue'> text='请对以下输入进行分析：\n处理后的输入: 人工智能正在改变我们的生活'
    # 4. 给 llm
    # 5. 输出 {"text": "人工智能正在改变我们的生活", "analysis_result": "xxxx"}

    result = chain({"text": "人工智能正在改变我们的生活"})
    print("\n最终结果:")
    print(result)
    print("*" * 50)


def demo5_router_chain():
    """示例 5: 使用路由链根据输入选择不同的处理路径"""
    print("*" * 50)
    print("示例 5: 使用路由链根据输入选择不同的处理路径")
    print("*" * 50)
    
    # 这里使用 ChatPromptTemplate 和链式调用实现简单的路由逻辑
    # 首先创建一个分类器
    classifier_prompt = ChatPromptTemplate.from_template(
        """你是一个文本分类器。请判断以下问题属于哪个类别：技术问题、历史问题、科学问题、生活问题或其他。
        只回复类别名称，不要有任何其他文本。
        
        问题: {question}
        """
    )
    
    classifier_chain = classifier_prompt | llm | StrOutputParser()
    
    # 创建各种专门的回答链
    tech_prompt = ChatPromptTemplate.from_template(
        """你是一位技术专家，请回答以下技术问题：
        
        问题: {question}
        """
    )
    tech_chain = tech_prompt | llm | StrOutputParser()
    
    history_prompt = ChatPromptTemplate.from_template(
        """你是一位历史学者，请回答以下历史问题：
        
        问题: {question}
        """
    )
    history_chain = history_prompt | llm | StrOutputParser()
    
    science_prompt = ChatPromptTemplate.from_template(
        """你是一位科学家，请回答以下科学问题：
        
        问题: {question}
        """
    )
    science_chain = science_prompt | llm | StrOutputParser()
    
    general_prompt = ChatPromptTemplate.from_template(
        """请回答以下问题：
        
        问题: {question}
        """
    )
    general_chain = general_prompt | llm | StrOutputParser()
    
    # 自定义路由函数
    def route_question(question):
        # 使用分类器确定问题类型
        category = classifier_chain.invoke({"question": question})
        print(f"问题类别: {category}")
        
        # 基于类别选择合适的链
        if "技术" in category:
            return tech_chain.invoke({"question": question})
        elif "历史" in category:
            return history_chain.invoke({"question": question})
        elif "科学" in category:
            return science_chain.invoke({"question": question})
        else:
            return general_chain.invoke({"question": question})
    
    # 测试不同类型的问题
    questions = [
        "Python 和 JavaScript 有什么区别？",
        "古罗马帝国是如何衰落的？",
        "黑洞是如何形成的？",
        "如何保持健康的生活方式？"
    ]
    
    for question in questions:
        print(f"\n问题: {question}")
        answer = route_question(question)
        print(f"回答: {answer}")
    
    print("*" * 50)


if __name__ == "__main__":
    # 用户可以选择运行特定的 demo
    import argparse

    parser = argparse.ArgumentParser(description="运行 LangChain Chains 示例")
    parser.add_argument(
        "--demo",
        type=int,
        choices=[1, 2, 3, 4, 5],
        help="选择要运行的 demo: 1=LLMChain, 2=SequentialChain, 3=SimpleSequentialChain, 4=TransformChain, 5=RouterChain",
    )
    args = parser.parse_args()

    if args.demo == 1:
        demo1_llm_chain()
    elif args.demo == 2:
        demo2_sequential_chain()
    elif args.demo == 3:
        demo3_simple_sequential_chain()
    elif args.demo == 4:
        demo4_transform_chain()
    elif args.demo == 5:
        demo5_router_chain()
    else:
        # 默认运行所有 demo
        print("运行所有示例...")
        demo1_llm_chain()
        demo2_sequential_chain()
        demo3_simple_sequential_chain()
        demo4_transform_chain()
        demo5_router_chain() 