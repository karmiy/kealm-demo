"""
RAG (Retrieval Augmented Generation) 实现示例

这个示例展示了如何使用 LangChain 实现基础的 RAG 系统，包括：
1. 文档加载和拆分
2. 向量化和存储
3. 检索相关内容
4. 将检索到的内容与 LLM 结合生成回答

核心概念：
1. 从外部知识库检索相关信息
2. 将这些信息与用户查询一起提供给 LLM
3. 让 LLM 基于这些信息生成回答
"""

import os
import sys
import argparse
import importlib.util

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS


# 检查依赖
def check_dependencies():
    """检查所需依赖是否安装"""
    missing_deps = []

    # 检查 sentence_transformers
    if importlib.util.find_spec("sentence_transformers") is None:
        missing_deps.append("sentence-transformers")

    # 检查 faiss
    if importlib.util.find_spec("faiss") is None:
        missing_deps.append("faiss-cpu")

    if missing_deps:
        print("缺少必要的依赖包，请安装以下依赖:")
        print(f"pip install {' '.join(missing_deps)}")
        return False
    return True


# 如果依赖检查通过，导入 HuggingFaceEmbeddings
if check_dependencies():
    from langchain_community.embeddings import HuggingFaceEmbeddings
else:
    # 提示用户安装依赖并退出
    print("请安装所需依赖后重新运行")
    if __name__ == "__main__":
        sys.exit(1)

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough


# 1. 示例数据 - 创建一个简单的知识库文件
def create_knowledge_base():
    """创建一个简单的知识库文件，用于演示 RAG 流程"""
    print("正在创建示例知识库...")
    kb_content = """
# 人工智能简介

人工智能（Artificial Intelligence，简称 AI）是计算机科学的一个分支，它致力于研究和开发能够模拟人类智能行为的系统。

## 人工智能的主要分支

1. **机器学习（Machine Learning）**：让计算机系统能够从数据中学习，而不需要明确编程。
   - 监督学习：从标记数据中学习
   - 无监督学习：从未标记数据中发现模式
   - 强化学习：通过与环境交互来学习最优策略

2. **深度学习（Deep Learning）**：使用神经网络的机器学习子集，特别是具有多层（"深"）神经网络。
   - 卷积神经网络（CNN）：主要用于图像识别
   - 循环神经网络（RNN）：用于序列数据，如文本和语音
   - 变换器（Transformer）：用于自然语言处理，是 GPT 等大型语言模型的基础

3. **自然语言处理（NLP）**：使计算机能够理解、解释和生成人类语言。
   - 情感分析：确定文本中表达的情感
   - 机器翻译：在不同语言之间翻译文本
   - 问答系统：回答自然语言问题

## 大型语言模型（LLM）

大型语言模型是一种基于变换器架构的深度学习模型，它们在大量文本数据上训练，能够理解和生成人类语言。

### LLM 的主要特点

- **规模大**：通常有数十亿到数万亿参数
- **上下文理解**：能够理解长文本中的上下文
- **少样本学习**：能够通过少量示例学习新任务
- **通用性**：可用于多种 NLP 任务

### 知名的 LLM 模型

1. **GPT 系列（OpenAI）**：包括 GPT-3、GPT-4 等
2. **LLaMA（Meta）**：开源大型语言模型
3. **Claude（Anthropic）**：强调安全对齐的助手
4. **文心一言（百度）**：中文大型语言模型
5. **通义千问（阿里巴巴）**：多模态大型语言模型

## 人工智能的应用领域

1. **医疗健康**：疾病诊断、药物发现、医学影像分析
2. **金融服务**：欺诈检测、算法交易、风险评估
3. **交通运输**：自动驾驶、交通流量优化、路线规划
4. **教育**：个性化学习、自动评分、教育内容生成
5. **客户服务**：聊天机器人、情感分析、个性化推荐
    """

    kb_file = os.path.join(os.path.dirname(__file__), "knowledge_base.txt")
    with open(kb_file, "w", encoding="utf-8") as f:
        f.write(kb_content)

    print(f"知识库已创建: {kb_file}")
    return kb_file


# 2. 创建 RAG 系统
def create_rag_system(knowledge_file):
    """创建一个完整的 RAG 系统"""
    print("正在创建 RAG 系统...")

    # 2.1 加载文档
    documents = TextLoader(knowledge_file, encoding="utf-8").load()

    # 2.2 文档分割
    text_splitter = RecursiveCharacterTextSplitter(
        # 每个文本块的最大字符数为 500。如果一个段落超过 500 个字符，它会被分割成更小的块
        chunk_size=500,
        # 相邻文本块之间的重叠字符数为 100。重叠是为了保持上下文的连贯性，确保分割的文本块之间不会丢失关键信息
        chunk_overlap=100,
        separators=["\n## ", "\n### ", "\n#### ", "\n", " ", ""],
    )
    chunks = text_splitter.split_documents(documents)
    print(f"文档已分割为 {len(chunks)} 个块")

    # 2.3 创建向量存储
    print("初始化本地嵌入模型，首次运行可能需要下载模型（约 100MB）...")

    # 使用 HuggingFace 的 sentence-transformers 模型
    # 是个专门用于生成文本嵌入向量的本地模型，不是大语言模型 LLM，是用于输出数值向量的嵌入模型 Embedding Model，不需要 api key
    # all-MiniLM-L6-v2 是一个轻量级模型，效果较好且资源需求低
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={"device": "cpu"},
    )
    print("嵌入模型初始化成功")

    # 使用 FAISS 作为向量存储，它是一个高效的相似性搜索库
    # 可以理解为向量数据库，向量索引库，专门存储和检索高维向量数据
    vector_store = FAISS.from_documents(chunks, embeddings)
    # k: 3 表示每次查询时返回最相似的 3 个文档块
    # k 值太小（如 1）：提供给LLM的上下文信息可能不足
    # k 值太大（如 10+）：可能引入无关信息，干扰LLM的回答，又消耗 token
    retriever = vector_store.as_retriever(search_kwargs={"k": 3})
    print("向量存储和检索器已创建")

    # 2.4 创建 RAG 提示模板
    prompt_template = """
你是一个人工智能助手，请根据下面提供的上下文信息回答用户问题。
如果你不知道答案，就说你不知道，不要试图编造答案。

上下文信息:
{context}

用户问题: {question}

请提供详细、准确的回答:
"""
    prompt = ChatPromptTemplate.from_template(prompt_template)

    # 2.5 构建 RAG 链
    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    rag_chain = (
        # 创建 { context: xxx, question: xxx } 的字典
        # retriever 将 rag_chain.invoke 的内容转向量，FAISS 索引中搜索最相似的 3 个文档块
        # format_docs 函数将这些文档块合并为单个字符串
        # RunnablePassthrough 将输入原样传递给输出，不做任何修改。确保原始问题不变地传递到提示模板中，同时允许其他字段（如 "context"）被其他处理步骤修改。它是创建数据流管道时常用的工具
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    print("RAG 系统创建完成")
    return rag_chain


# 3. RAG 示例演示
def run_rag_demo():
    """运行 RAG 系统示例"""
    print("\n" + "*" * 50)
    print("RAG (检索增强生成) 示例演示")
    print("*" * 50)

    # 创建知识库和 RAG 系统
    kb_file = create_knowledge_base()
    try:
        rag_chain = create_rag_system(kb_file)

        # 示例问题
        questions = [
            "什么是大型语言模型？",
            "深度学习和机器学习有什么区别？",
            "人工智能在医疗领域有哪些应用？",
            "GPT 和 LLaMA 有什么不同？",
            "什么是强化学习？",
        ]

        # 回答问题示例
        for i, question in enumerate(questions, 1):
            print(f"\n问题 {i}: {question}")
            try:
                response = rag_chain.invoke(question)
                print(f"回答: {response}")
            except Exception as e:
                print(f"处理问题时出错: {str(e)}")

            # 在每个问题之间添加分隔线
            if i < len(questions):
                print("\n" + "-" * 40)

        # 交互模式
        print("\n" + "*" * 50)
        print("交互模式: 你可以向 RAG 系统提问，输入 'exit' 退出")
        print("*" * 50)

        while True:
            user_input = input("\n请输入你的问题: ")
            if user_input.lower() == "exit":
                print("退出 RAG 系统。")
                break

            try:
                response = rag_chain.invoke(user_input)
                print(f"回答: {response}")
            except Exception as e:
                print(f"处理问题时出错: {str(e)}")

    except Exception as e:
        print(f"创建 RAG 系统时出错: {str(e)}")

    finally:
        # 清理创建的临时文件
        try:
            os.remove(kb_file)
            print(f"已删除临时知识库文件: {kb_file}")
        except Exception:
            pass


# 4. RAG 和直接 LLM 对比演示
def compare_rag_vs_llm():
    """对比 RAG 和直接 LLM 回答的差异"""
    print("\n" + "*" * 50)
    print("RAG vs 直接 LLM 回答对比")
    print("*" * 50)

    # 创建知识库和 RAG 系统
    kb_file = create_knowledge_base()
    try:
        rag_chain = create_rag_system(kb_file)

        # 创建直接 LLM 链
        direct_prompt = ChatPromptTemplate.from_template("请回答下面的问题: {question}")
        direct_chain = direct_prompt | llm | StrOutputParser()

        # 示例问题 (特定领域问题，知识库中包含但可能不在 LLM 训练数据中，或包含特殊信息)
        question = "文心一言和通义千问是什么，它们有什么特点？"

        print(f"\n问题: {question}")

        # RAG 回答
        print("\n使用 RAG 的回答:")
        rag_response = rag_chain.invoke(question)
        print(rag_response)

        # 直接 LLM 回答
        print("\n直接使用 LLM 的回答:")
        direct_response = direct_chain.invoke({"question": question})
        print(direct_response)

        print("\n" + "*" * 50)
        print("对比分析: RAG 系统能够利用特定知识库中的信息提供更具体、准确的回答，")
        print("而直接 LLM 回答基于其训练数据，可能缺少特定或最新信息。")
        print("*" * 50)

    except Exception as e:
        print(f"创建 RAG 系统时出错: {str(e)}")

    finally:
        # 清理创建的临时文件
        try:
            os.remove(kb_file)
            print(f"已删除临时知识库文件: {kb_file}")
        except Exception:
            pass


if __name__ == "__main__":
    # 添加命令行参数支持
    parser = argparse.ArgumentParser(description="运行 LangChain RAG 示例")
    parser.add_argument(
        "--demo",
        type=int,
        choices=[1, 2],
        help="选择要运行的 demo: 1=RAG 基本演示, 2=RAG vs LLM 对比",
    )
    args = parser.parse_args()

    if args.demo == 1:
        run_rag_demo()
    elif args.demo == 2:
        compare_rag_vs_llm()
    else:
        # 默认情况下，显示选择菜单
        print("\n请选择要运行的演示:")
        print("1. RAG 基本演示 - 使用检索增强生成回答问题")
        print("2. RAG vs LLM 对比 - 比较 RAG 和直接 LLM 回答的差异")

        choice = input("请输入选项 (1 或 2): ")

        if choice == "1":
            run_rag_demo()
        elif choice == "2":
            compare_rag_vs_llm()
        else:
            print("无效选项，请输入 1 或 2")
