"""
Evaluation - 评估 LLM 应用性能

LangChain 的 Evaluation 模块提供了一系列工具来评估 LLM 应用的性能：
1. 正确性评估：判断 LLM 回答是否与参考答案一致
2. 相关性评估：评估回答与问题的相关程度
3. 量化评分：为回答质量提供数值评分
4. 人类反馈集成：收集和整合人类评价

主要组件：
- QAEvalChain：评估问答应用的准确性
- LLMGradeEvaluator：使用 LLM 对回答进行评分
- StringEvaluator：评估字符串输出
- PairwiseStringEvaluator：比较两个不同模型的输出

使用场景：
- 比较不同 LLM 或提示模板的性能
- 检测和修复幻觉问题
- 评估检索增强生成的有效性
- 持续监控 LLM 应用质量
- 构建基于人类反馈的改进循环
"""

import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

from langchain.evaluation.qa import QAEvalChain
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser


def demo1_basic_qa_evaluation():
    """示例 1: 使用 QAEvalChain 评估问答系统的准确性"""
    print("*" * 50)
    print("示例 1: 使用 QAEvalChain 评估问答系统的准确性")
    print("*" * 50)

    # 使用全局 llm 实例而不是创建新的 ChatOpenAI 实例
    # 创建 QA 评估链
    eval_chain = QAEvalChain.from_llm(llm=llm)

    # 准备评估数据: 问题、参考答案和模型预测
    examples = [
        {
            "query": "Python 是什么类型的编程语言？",
            "answer": "Python 是一种高级、解释型、通用编程语言，支持多种编程范式。",
        },
        {
            "query": "人工智能的主要目标是什么？",
            "answer": "人工智能的主要目标是开发能够模拟人类智能行为的系统和机器。",
        },
    ]

    # 模拟模型预测结果
    # 注：实际使用场景中，predictions 通常是由您的应用中的 LLM 生成的真实回答数据
    predictions = [
        {
            "query": "Python 是什么类型的编程语言？",
            "result": "Python 是一种高级解释型语言，强调代码可读性，并支持面向对象、命令式和函数式编程范式。",
        },
        {
            "query": "人工智能的主要目标是什么？",
            "result": "人工智能旨在创建能够执行通常需要人类智能的任务的系统，如视觉识别、语音识别和决策。",
        },
    ]

    # 运行评估
    # 流程：
    # LLM在这里扮演"评判员"角色
    # 前一个 LLM 生成 predictions 结果（这里用 demo 数据）
    # eval_chain 评估链会将问题、参考答案和模型预测包装成提示 prompt
    # prompt 发送给LLM，让LLM判断预测的正确性
    # LLM 评估每个预测是否与参考答案一致并给出解释
    graded_outputs = eval_chain.evaluate(
        examples,
        predictions,
        question_key="query",
        answer_key="answer",
        prediction_key="result",
    )

    # 显示评估结果
    for i, example in enumerate(examples):
        print(f"问题: {example['query']}")
        print(f"参考答案: {example['answer']}")
        print(f"模型回答: {predictions[i]['result']}")
        print(f"评估结果: {graded_outputs[i]['results']}")
        print("-" * 40)

    print("*" * 50)


def demo2_criteria_evaluation():
    """示例 2: 使用简单的提示评估回答"""
    print("*" * 50)
    print("示例 2: 使用简单的提示评估回答")
    print("*" * 50)

    # 创建要评估的示例内容
    input_text = "请介绍量子计算的基本原理"
    prediction = """
    量子计算利用量子力学原理进行信息处理。与经典计算使用的二进制位不同，量子计算使用量子比特或"qubit"，
    它可以同时处于多个状态。这种特性称为叠加态。此外，量子比特可以通过量子纠缠相互关联，
    使得一个量子比特的状态可以影响另一个量子比特，即使它们物理上分离。
    量子计算利用这些特性进行并行计算，潜在地解决某些经典计算机难以处理的问题。
    """

    # 创建评估提示模板
    accuracy_template = """
    请评估以下回答的准确性。

    问题: {input}
    回答: {prediction}
    
    首先分析回答中的事实信息是否准确，然后给出1-5分的评分，其中5分表示完全准确。
    
    输出格式:
    分析: <你的分析>
    分数: <1-5分>
    """

    helpfulness_template = """
    请评估以下回答的有用性。

    问题: {input}
    回答: {prediction}
    
    分析这个回答对用户有多大帮助，然后给出1-5分的评分，其中5分表示非常有用。
    
    输出格式:
    分析: <你的分析>
    分数: <1-5分>
    """

    conciseness_template = """
    请评估以下回答的简洁性。

    问题: {input}
    回答: {prediction}
    
    分析回答是否简洁明了，没有冗余信息，然后给出1-5分的评分，其中5分表示非常简洁。
    
    输出格式:
    分析: <你的分析>
    分数: <1-5分>
    """

    # 创建评估链
    accuracy_chain = (
        PromptTemplate.from_template(accuracy_template) | llm | StrOutputParser()
    )

    helpfulness_chain = (
        PromptTemplate.from_template(helpfulness_template) | llm | StrOutputParser()
    )

    conciseness_chain = (
        PromptTemplate.from_template(conciseness_template) | llm | StrOutputParser()
    )

    # 运行评估
    accuracy_result = accuracy_chain.invoke(
        {"input": input_text, "prediction": prediction}
    )
    helpfulness_result = helpfulness_chain.invoke(
        {"input": input_text, "prediction": prediction}
    )
    conciseness_result = conciseness_chain.invoke(
        {"input": input_text, "prediction": prediction}
    )

    # 显示评估结果
    print(f"输入问题: {input_text}")
    print(f"模型回答:\n{prediction}")
    print("\n评估结果:")
    print(f"1. 准确性评估:\n{accuracy_result}")
    print()
    print(f"2. 有用性评估:\n{helpfulness_result}")
    print()
    print(f"3. 简洁性评估:\n{conciseness_result}")

    print("*" * 50)


def demo3_custom_evaluation():
    """示例 3: 创建自定义评估器评估回答"""
    print("*" * 50)
    print("示例 3: 创建自定义评估器评估回答")
    print("*" * 50)

    # 定义评估问题
    query = "解释区块链技术如何工作？"

    # 定义两个不同的回答
    answer_1 = """
    区块链是一种分布式账本技术，它使用密码学将交易记录在一系列相连的区块中。每个区块包含前一个区块的哈希值，
    形成一个不可篡改的链。网络中的参与者通过共识机制验证交易，确保数据的一致性和安全性。
    """

    answer_2 = """
    区块链是一种新技术，可以存储很多数据。它很安全，没人能黑进去。比特币用了这个技术，所以很多人都在谈论它。
    它基本上就是一个大数据库，但更好更安全。
    """

    # 创建自定义评估提示模板
    eval_prompt = PromptTemplate.from_template(
        """请评估以下对问题的回答质量。考虑以下几点：
        1. 技术准确性 - 回答是否包含准确的技术信息？
        2. 解释清晰度 - 解释是否易于理解？
        3. 完整性 - 回答是否涵盖了主题的关键方面？
        
        问题: {question}
        回答: {answer}
        
        首先详细分析回答的优缺点，然后给出 1-10 的分数，10 分表示完美回答。
        最后，提供一个简短的总结标签："优秀"、"良好"、"一般"或"不足"。
        
        请按以下格式输出：
        分析: <你的分析>
        分数: <1-10分>
        标签: <优秀/良好/一般/不足>
        """
    )

    # 创建自定义评估链
    eval_chain = eval_prompt | llm | StrOutputParser()

    # 评估两个答案
    evaluation_1 = eval_chain.invoke({"question": query, "answer": answer_1})
    evaluation_2 = eval_chain.invoke({"question": query, "answer": answer_2})

    # 显示评估结果
    print(f"问题: {query}\n")

    print("回答 1:")
    print(answer_1)
    print("\n评估结果:")
    print(evaluation_1)
    print("-" * 40)

    print("回答 2:")
    print(answer_2)
    print("\n评估结果:")
    print(evaluation_2)

    print("*" * 50)


def demo4_pairwise_comparison():
    """示例 4: 比较两个模型的回答质量"""
    print("*" * 50)
    print("示例 4: 比较两个模型的回答质量")
    print("*" * 50)

    # 创建一个比较两个回答的提示模板
    compare_prompt = PromptTemplate.from_template(
        """你需要比较两个关于同一问题的不同回答，并确定哪一个更好。
        
        问题: {question}
        
        回答 A:
        {answer_a}
        
        回答 B:
        {answer_b}
        
        请考虑以下因素：准确性、清晰度、信息量和实用性。
        详细分析两个回答的优缺点，然后明确选择更好的回答。
        
        输出格式：
        分析: <详细分析两个回答>
        结论: <A或B> 更好，因为 <原因>
        """
    )

    # 创建比较链
    compare_chain = compare_prompt | llm | StrOutputParser()

    # 问题和两种不同的回答
    questions_and_answers = [
        {
            "question": "为什么天空是蓝色的？",
            "answer_a": "天空呈蓝色是因为大气中的气体分子散射阳光。这种散射称为瑞利散射，蓝光比其他颜色更容易被散射，因为它的波长较短。",
            "answer_b": "天空是蓝色的，因为光线穿过大气层时，蓝色被反射。这是物理现象造成的视觉效果。",
        },
        {
            "question": "机器学习和深度学习有什么区别？",
            "answer_a": "机器学习是AI的一个分支，而深度学习是机器学习的一种特殊类型。",
            "answer_b": "机器学习是人工智能的一个子领域，侧重于开发能从数据中学习的算法。深度学习是机器学习的一个特定分支，使用多层神经网络处理复杂模式，特别适合处理图像、语音和自然语言等非结构化数据。",
        },
    ]

    # 执行比较
    for i, qa_pair in enumerate(questions_and_answers):
        comparison_result = compare_chain.invoke(
            {
                "question": qa_pair["question"],
                "answer_a": qa_pair["answer_a"],
                "answer_b": qa_pair["answer_b"],
            }
        )

        print(f"示例 {i+1}")
        print(f"问题: {qa_pair['question']}")
        print(f"\n回答 A: {qa_pair['answer_a']}")
        print(f"\n回答 B: {qa_pair['answer_b']}")
        print(f"\n比较结果:\n{comparison_result}")
        print("-" * 40)

    print("*" * 50)


if __name__ == "__main__":
    # 用户可以选择运行特定的 demo
    # python3/python ./03-Applications/4-evaluation.py --demo 1
    import argparse

    parser = argparse.ArgumentParser(description="运行 LangChain Evaluation 示例")
    parser.add_argument(
        "--demo",
        type=int,
        choices=[1, 2, 3, 4],
        help="选择要运行的 demo: 1=基础QA评估, 2=标准评估, 3=自定义评估, 4=比较评估",
    )
    args = parser.parse_args()

    if args.demo == 1:
        demo1_basic_qa_evaluation()
    elif args.demo == 2:
        demo2_criteria_evaluation()
    elif args.demo == 3:
        demo3_custom_evaluation()
    elif args.demo == 4:
        demo4_pairwise_comparison()
    else:
        # 默认运行所有 demo
        print("运行所有示例...")
        demo1_basic_qa_evaluation()
        demo2_criteria_evaluation()
        demo3_custom_evaluation()
        demo4_pairwise_comparison()
