"""
Document Loaders - 处理不同格式的文档

Document Loaders 是 LangChain 中用于加载各种文档格式的组件，它能够：
1. 从多种来源提取文本数据（本地文件、网络资源、数据库等）
2. 处理不同格式的文档（TXT、PDF、DOCX、HTML、Markdown 等）
3. 保留文档的元数据（来源、创建时间、页码等）

主要组件：
- 文本加载器（TextLoader）：加载纯文本文件
- 网页加载器（WebBaseLoader）：从网页 URL 加载内容
- CSV 加载器（CSVLoader）：处理 CSV 格式数据
- PDF 加载器（PyPDFLoader）：处理 PDF 文档
- 目录加载器（DirectoryLoader）：批量处理整个目录中的文件

使用场景：
- 构建知识库：将企业内部文档转化为可查询的知识库
- 数据分析：从多种来源提取结构化和非结构化数据
- 内容聚合：整合不同平台和格式的数据
- 训练数据准备：为模型微调或 RAG 系统准备训练数据
"""

import sys
import os
import tempfile
import csv
import requests
from pathlib import Path

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from base.llm import llm

from langchain_community.document_loaders import (
    TextLoader,
    CSVLoader,
    DirectoryLoader,
    WebBaseLoader,
    UnstructuredMarkdownLoader,
)
from langchain_community.document_loaders.generic import GenericLoader
from langchain_community.document_loaders.parsers.language.language_parser import (
    LanguageParser,
)
from langchain_text_splitters import RecursiveCharacterTextSplitter


# 创建示例文件的辅助函数
def create_sample_files():
    """创建示例文件用于演示"""
    # 创建一个临时目录
    tmp_dir = tempfile.mkdtemp()

    # 创建示例文本文件
    text_file_path = os.path.join(tmp_dir, "sample.txt")
    with open(text_file_path, "w", encoding="utf-8") as f:
        f.write(
            """这是一个示例文本文件。
        
LangChain 是一个强大的框架，用于开发由语言模型驱动的应用程序。
它提供了一系列工具和组件，使开发者能够轻松构建复杂的 AI 应用。

Document Loaders 是 LangChain 的重要组件之一，它允许从各种来源加载文档。"""
        )

    # 创建示例 CSV 文件
    csv_file_path = os.path.join(tmp_dir, "sample.csv")
    with open(csv_file_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["名称", "描述", "类别"])
        writer.writerow(["TextLoader", "加载文本文件", "文档加载器"])
        writer.writerow(["CSVLoader", "加载 CSV 文件", "文档加载器"])
        writer.writerow(["WebBaseLoader", "加载网页内容", "文档加载器"])
        writer.writerow(["DirectoryLoader", "加载整个目录", "文档加载器"])

    # 创建示例 Markdown 文件
    md_file_path = os.path.join(tmp_dir, "sample.md")
    with open(md_file_path, "w", encoding="utf-8") as f:
        f.write(
            """# Document Loaders 介绍

## 什么是 Document Loaders?

Document Loaders 是 LangChain 中用于从各种来源加载文档的组件。它们可以处理多种文档格式，并将其转换为 LangChain 可以处理的格式。

## 常见的 Document Loaders

1. **TextLoader**: 加载纯文本文件
2. **CSVLoader**: 加载 CSV 文件
3. **PDFLoader**: 加载 PDF 文件
4. **WebBaseLoader**: 从网页加载内容

## 使用场景

- 构建知识库
- 数据分析
- 内容聚合
"""
        )

    # 创建一个子目录用于 DirectoryLoader 演示
    subdir_path = os.path.join(tmp_dir, "subdir")
    os.makedirs(subdir_path, exist_ok=True)

    # 在子目录中创建额外的文本文件
    for i in range(1, 4):
        file_path = os.path.join(subdir_path, f"file_{i}.txt")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(
                f"这是子目录中的第 {i} 个文件。\n它包含一些示例文本，用于演示 DirectoryLoader 的功能。"
            )

    return tmp_dir


def demo1_text_loader():
    """示例 1: 使用 TextLoader 加载文本文件"""
    print("*" * 50)
    print("示例 1: 使用 TextLoader 加载文本文件")
    print("*" * 50)

    # 创建示例文件
    tmp_dir = create_sample_files()
    text_file_path = os.path.join(tmp_dir, "sample.txt")

    # 使用 TextLoader 加载文本文件
    loader = TextLoader(text_file_path, encoding="utf-8")
    documents = loader.load()

    print(f"加载了 {len(documents)} 个文档")
    print("\n文档内容:")
    # Document 对象有 page_content 和 metadata 属性
    print(f"内容: {documents[0].page_content[:100]}...")
    print(f"元数据: {documents[0].metadata}")

    # 使用文本分割器处理长文档
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=100,  # 每个块的最大字符数
        chunk_overlap=20,  # 块之间的重叠字符数
        separators=["\n\n", "\n", " ", ""],  # 分隔符优先级
    )

    # 分割文档
    chunks = text_splitter.split_documents(documents)

    print(f"\n文档被分割为 {len(chunks)} 个块")
    for i, chunk in enumerate(chunks):
        print(f"\n块 {i+1}:")
        print(f"内容: {chunk.page_content}")
        print(f"元数据: {chunk.metadata}")

    print("*" * 50)


def demo2_csv_loader():
    """示例 2: 使用 CSVLoader 加载 CSV 文件"""
    print("*" * 50)
    print("示例 2: 使用 CSVLoader 加载 CSV 文件")
    print("*" * 50)

    # 创建示例文件
    tmp_dir = create_sample_files()
    csv_file_path = os.path.join(tmp_dir, "sample.csv")

    # 使用 CSVLoader 加载 CSV 文件
    # CSV 文件的每一行将被转换为一个单独的文档
    loader = CSVLoader(
        file_path=csv_file_path,
        csv_args={
            "delimiter": ",",  # 分隔符
            "quotechar": '"',  # 引号字符
        },
        encoding="utf-8",
    )

    documents = loader.load()

    print(f"从 CSV 文件加载了 {len(documents)} 个文档")

    # 显示每个文档的内容
    for i, doc in enumerate(documents):
        print(f"\n文档 {i+1}:")
        print(f"内容: {doc.page_content}")
        print(f"元数据: {doc.metadata}")

    print("*" * 50)


def demo3_web_loader():
    """示例 3: 使用 WebBaseLoader 从网页加载内容"""
    print("*" * 50)
    print("示例 3: 使用 WebBaseLoader 从网页加载内容")
    print("*" * 50)

    try:
        # 使用 WebBaseLoader 从 URL 加载内容
        loader = WebBaseLoader(
            web_paths=[
                "https://python.langchain.com/docs/integrations/document_loaders/"
            ],
            bs_kwargs={
                "parse_only": None  # 可以使用 bs4.SoupStrainer 来只解析页面的特定部分
            },
        )

        documents = loader.load()

        print(f"从网页加载了 {len(documents)} 个文档")
        print("\n文档内容示例:")
        print(f"标题: {documents[0].page_content[:150]}...")
        print(f"元数据: {documents[0].metadata}")

        # 分割文档以便处理长网页
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        chunks = text_splitter.split_documents(documents)

        print(f"\n网页内容被分割为 {len(chunks)} 个块")
        print(f"第一个块: {chunks[0].page_content[:200]}...")

    except Exception as e:
        print(f"加载网页时出错: {str(e)}")
        print("请确保网络连接正常，或尝试其他 URL")

    print("*" * 50)


def demo4_directory_loader():
    """示例 4: 使用 DirectoryLoader 加载整个目录"""
    print("*" * 50)
    print("示例 4: 使用 DirectoryLoader 加载整个目录")
    print("*" * 50)

    # 创建示例文件
    tmp_dir = create_sample_files()
    subdir_path = os.path.join(tmp_dir, "subdir")

    # 使用 DirectoryLoader 加载目录
    # glob 参数指定要加载的文件模式
    loader = DirectoryLoader(
        path=subdir_path,
        glob="**/*.txt",  # 加载所有 .txt 文件，包括子目录
        loader_cls=TextLoader,  # 使用 TextLoader 处理每个文件
        loader_kwargs={"encoding": "utf-8"},  # 传递给 TextLoader 的参数
    )

    documents = loader.load()

    print(f"从目录加载了 {len(documents)} 个文档")

    # 显示每个文档的基本信息
    for i, doc in enumerate(documents):
        file_path = doc.metadata.get("source", "未知")
        file_name = os.path.basename(file_path)
        print(f"\n文档 {i+1}: {file_name}")
        print(f"内容前 50 个字符: {doc.page_content[:50]}...")

    print("*" * 50)


def demo5_markdown_loader():
    """示例 5: 使用专门的加载器处理 Markdown 文件"""
    print("*" * 50)
    print("示例 5: 使用专门的加载器处理 Markdown 文件")
    print("*" * 50)

    # 创建示例文件
    tmp_dir = create_sample_files()
    md_file_path = os.path.join(tmp_dir, "sample.md")

    # 使用 UnstructuredMarkdownLoader 加载 Markdown 文件（单文档模式）
    loader = UnstructuredMarkdownLoader(md_file_path, mode="single")
    documents = loader.load()

    print(f"从 Markdown 文件加载了 {len(documents)} 个文档 (single模式)")
    print("\n文档内容:")
    print(f"内容: {documents[0].page_content[:200]}...")
    print(f"元数据: {documents[0].metadata}")

    # 使用元素模式加载，保留 Markdown 结构
    loader_elements = UnstructuredMarkdownLoader(md_file_path, mode="elements")
    elements = loader_elements.load()

    print(f"\n使用元素模式加载 Markdown，获得了 {len(elements)} 个结构化元素")

    # 分析元素类型
    element_types = set(
        element.metadata.get("category", "未知") for element in elements
    )
    print(f"元素类型: {element_types}")

    # 显示各类元素示例
    print("\n不同元素类型示例:")
    shown_types = set()
    for element in elements:
        element_type = element.metadata.get("category", "未知")
        if element_type not in shown_types and element.page_content.strip():
            print(f"\n{element_type} 示例:")
            print(f"内容: {element.page_content[:100]}")
            print(f"元数据: {element.metadata}")
            shown_types.add(element_type)
            if len(shown_types) >= len(element_types):
                break

    print("*" * 50)


if __name__ == "__main__":
    # 用户可以选择运行特定的 demo
    # python ./03-Applications/3-documentLoaders.py --demo 1
    import argparse

    parser = argparse.ArgumentParser(description="运行 LangChain Document Loaders 示例")
    parser.add_argument(
        "--demo",
        type=int,
        choices=[1, 2, 3, 4, 5],
        help="选择要运行的 demo: 1=文本加载器, 2=CSV 加载器, 3=网页加载器, 4=目录加载器, 5=Markdown 加载器",
    )
    args = parser.parse_args()

    if args.demo == 1:
        demo1_text_loader()
    elif args.demo == 2:
        demo2_csv_loader()
    elif args.demo == 3:
        demo3_web_loader()
    elif args.demo == 4:
        demo4_directory_loader()
    elif args.demo == 5:
        demo5_markdown_loader()
    else:
        # 默认运行所有 demo
        print("运行所有示例...")
        demo1_text_loader()
        demo2_csv_loader()
        demo3_web_loader()
        demo4_directory_loader()
        demo5_markdown_loader()
