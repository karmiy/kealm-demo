"""
RetrievalQA - 构建问答系统

RetrievalQA 是 LangChain 中用于构建问答系统的组件，它结合了检索（Retrieval）和问答（QA）功能：
1. 检索部分负责从知识库中找到与问题相关的文档
2. 问答部分使用 LLM 基于检索到的文档生成答案

主要组件：
- Retriever: 负责文档检索的组件，如 VectorStoreRetriever
- LLM: 负责生成答案的大语言模型
- Prompt: 定义如何向 LLM 提问的模板
- Chain: 将检索和问答过程串联起来的链条

理解：
- RetrievalQA 是 RAG (检索增强生成) 的一种具体实现，专注于问答场景
- 而 RAG 是更广泛的概念，而 RetrievalQA 是 RAG 在问答系统中的一种特定应用形式
- RetrievalQA 是 LangChain 对 RAG 在问答场景下的一种便捷实现

使用场景：
- 基于特定知识库构建的问答系统
- 需要精确引用外部信息的聊天机器人
- 企业内部文档智能搜索与问答
- 学术研究或法律文本分析工具
"""

import sys
import os
import tempfile

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA


def check_dependencies():
    """检查所需依赖是否安装"""
    import importlib.util

    missing_deps = []

    # 检查 sentence_transformers
    if importlib.util.find_spec("sentence_transformers") is None:
        missing_deps.append("sentence-transformers")

    # 检查 faiss
    if importlib.util.find_spec("faiss") is None:
        missing_deps.append("faiss-cpu")

    # 检查 langchain-huggingface
    if importlib.util.find_spec("langchain_huggingface") is None:
        missing_deps.append("langchain-huggingface")

    if missing_deps:
        print("缺少必要的依赖包，请安装以下依赖:")
        print(f"pip install {' '.join(missing_deps)}")
        return False
    return True


def create_sample_data():
    """创建示例数据文件用于演示"""
    # 创建一个临时文件夹来存储示例数据
    tmp_dir = tempfile.mkdtemp()
    file_path = os.path.join(tmp_dir, "sample_data.txt")

    # 写入示例数据
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(
            """
LangChain 是一个用于开发由语言模型驱动的应用程序的框架。它具有以下主要组件：

1. 模型 IO: LangChain 提供与各种语言模型交互的接口，包括 OpenAI、Anthropic、Hugging Face 等。

2. 检索增强生成 (RAG): 这是 LangChain 的核心功能之一。RAG 允许模型从外部知识库检索信息，大大增强了语言模型的能力和准确性。

3. 代理 (Agents): LangChain 提供了一个代理框架，允许语言模型决定采取哪些行动，执行这些行动，观察结果，并重复此过程直到完成任务。

4. 记忆 (Memory): LangChain 提供工具来保持对话状态，允许模型记住过去的交互。

5. 链 (Chains): LangChain 允许将多个组件组合成一个连贯的应用，即"链"。

LangChain 适用于各种应用场景，包括个人助手、问答系统、聊天机器人、文档分析、代码分析等。

LangChain 支持多种编程语言，包括 Python 和 JavaScript，使开发人员能够灵活选择适合其项目的语言和工具。
"""
        )

    return file_path


def demo1_basic_retrievalqa():
    """示例 1: 基本的 RetrievalQA 实现"""
    print("*" * 50)
    print("示例 1: 基本的 RetrievalQA 实现")
    print("*" * 50)

    # 依赖检查
    if not check_dependencies():
        print("请安装必要的依赖后再运行")
        return

    # 创建示例数据
    file_path = create_sample_data()

    # 1. 加载文档
    loader = TextLoader(file_path, encoding="utf-8")  # 明确指定 utf-8 编码
    documents = loader.load()

    # 2. 切分文档
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_documents(documents)

    # 3. 创建向量存储
    # 使用 HuggingFace 的 sentence-transformers 模型
    # 是个专门用于生成文本嵌入向量的本地模型，不是大语言模型 LLM，是用于输出数值向量的嵌入模型 Embedding Model，不需要 api key
    # all-MiniLM-L6-v2 是一个轻量级模型，效果较好且资源需求低
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={"device": "cpu"},
    )
    vectorstore = FAISS.from_documents(texts, embeddings)

    # 4. 创建检索器
    retriever = vectorstore.as_retriever()

    # 5. 创建 RetrievalQA 链
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",  # 使用"stuff"方法 - 将所有检索到的文档合并后一次性发送给 LLM
        retriever=retriever,
    )

    # 6. 执行查询
    query = "LangChain 的主要组件有哪些？"
    # "query" 是 RetrievalQA 链接口约定的参数名，RetrievalQA 内部有内置 prompt 模板有 {query} 来接收
    result = qa.invoke({"query": query})

    print(f"问题: {query}")
    print(f"回答: {result['result']}")
    print("*" * 50)


def demo2_custom_prompt_qa():
    """示例 2: 使用自定义 Prompt 的 RetrievalQA"""
    print("*" * 50)
    print("示例 2: 使用自定义 Prompt 的 RetrievalQA")
    print("*" * 50)

    # 依赖检查
    if not check_dependencies():
        print("请安装必要的依赖后再运行")
        return

    # 创建示例数据
    file_path = create_sample_data()

    # 1. 加载文档
    loader = TextLoader(file_path, encoding="utf-8")  # 明确指定 utf-8 编码
    documents = loader.load()

    # 2. 切分文档
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_documents(documents)

    # 3. 创建向量存储
    # 使用 HuggingFace 的 sentence-transformers 模型替代 OpenAIEmbeddings
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={"device": "cpu"},
    )
    vectorstore = FAISS.from_documents(texts, embeddings)

    # 4. 创建检索器
    retriever = vectorstore.as_retriever()

    # 5. 创建自定义提示模板
    custom_prompt_template = """使用以下上下文来回答问题。如果你不知道答案，只需说"我没有足够的信息来回答这个问题"，不要试图编造答案。

上下文: {context}

问题: {question}

回答:"""

    PROMPT = PromptTemplate(
        template=custom_prompt_template, input_variables=["context", "question"]
    )

    # 6. 创建带有自定义提示的 RetrievalQA 链
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": PROMPT},
        return_source_documents=True,
    )

    # 7. 执行查询
    query = "LangChain 支持哪些编程语言？"
    # 使用 'question' 作为键，与自定义模板中的占位符匹配
    result = qa.invoke({"query": query})

    print(f"问题: {query}")
    print(f"回答: {result['result']}")
    print("*" * 50)


def demo3_lcel_retrievalqa():
    """示例 3: 使用 LCEL (LangChain Expression Language) 构建 RetrievalQA"""
    print("*" * 50)
    print("示例 3: 使用 LCEL 构建 RetrievalQA")
    print("*" * 50)

    # 依赖检查
    if not check_dependencies():
        print("请安装必要的依赖后再运行")
        return

    # 创建示例数据
    file_path = create_sample_data()

    # 1. 加载文档
    loader = TextLoader(file_path, encoding="utf-8")  # 明确指定 utf-8 编码
    documents = loader.load()

    # 2. 切分文档
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_documents(documents)

    # 3. 创建向量存储
    # 使用 HuggingFace 的 sentence-transformers 模型替代 OpenAIEmbeddings
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={"device": "cpu"},
    )
    vectorstore = FAISS.from_documents(texts, embeddings)

    # 4. 创建检索器
    retriever = vectorstore.as_retriever()

    # 5. 创建提示模板
    template = """使用以下检索到的内容回答问题。如果你无法从内容中找到答案，请说 "我没有足够的信息"，而不是尝试猜测。

检索到的内容:
{context}

问题: {question}

回答:"""

    prompt = PromptTemplate.from_template(template)

    # 6. 使用 LCEL 构建 RetrievalQA 链
    # 首先定义检索器链
    retrieval_chain = (
        # 创建 { context: xxx, question: xxx } 的字典
        # retriever 将 rag_chain.invoke 的内容转向量，FAISS 索引中搜索最相似的文档块
        # lambda 函数接收一个参数 x 并直接返回 x 本身，即恒等函数
        {"context": retriever, "question": lambda x: x}
        | prompt
        | llm
        | StrOutputParser()
    )

    # 7. 执行查询
    question = "LangChain 的 RAG 是什么？"
    answer = retrieval_chain.invoke(question)

    print(f"问题: {question}")
    print(f"回答: {answer}")
    print("*" * 50)


if __name__ == "__main__":
    # 用户可以选择运行特定的 demo
    # python ./03-Applications/2-retrievalQA.py --demo 1
    import argparse

    parser = argparse.ArgumentParser(description="运行 LangChain RetrievalQA 示例")
    parser.add_argument(
        "--demo",
        type=int,
        choices=[1, 2, 3],
        help="选择要运行的 demo: 1=基本的 RetrievalQA, 2=自定义 Prompt 的 RetrievalQA, 3=LCEL 构建的 RetrievalQA",
    )
    args = parser.parse_args()

    if args.demo == 1:
        demo1_basic_retrievalqa()
    elif args.demo == 2:
        demo2_custom_prompt_qa()
    elif args.demo == 3:
        demo3_lcel_retrievalqa()
    else:
        # 默认运行所有 demo
        print("运行所有示例...")
        demo1_basic_retrievalqa()
        demo2_custom_prompt_qa()
        demo3_lcel_retrievalqa()
