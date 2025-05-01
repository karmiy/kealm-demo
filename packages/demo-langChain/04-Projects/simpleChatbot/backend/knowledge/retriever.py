"""
知识检索模块
负责文档的加载、分割、索引和搜索
"""

import os
import sys
from typing import List, Dict, Any
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
import logging

# 确保可以导入项目模块
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(backend_dir)  # 添加后端目录到路径

from config.settings import VECTOR_DB_PATH, CHUNK_SIZE, CHUNK_OVERLAP, EMBEDDING_MODEL

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class KnowledgeRetriever:
    """知识检索类，负责管理文档和检索相关内容"""

    def __init__(self, documents_dir: str = None, embeddings_model: str = None):
        """
        初始化知识检索器

        Args:
            documents_dir: 文档目录路径
            embeddings_model: 使用的嵌入模型，默认使用配置文件中的设置
        """
        self.documents_dir = documents_dir
        self.embeddings = HuggingFaceEmbeddings(
            model_name=embeddings_model or EMBEDDING_MODEL,
            model_kwargs={"device": "cpu"},
        )
        self.vector_store = None
        self.is_initialized = False

    def load_documents(self) -> List[Document]:
        """
        从指定目录加载文档

        Returns:
            加载的文档列表
        """
        if not self.documents_dir or not os.path.exists(self.documents_dir):
            logger.warning(f"文档目录 {self.documents_dir} 不存在")
            return []

        try:
            # 加载文本文件
            loader = DirectoryLoader(
                self.documents_dir,
                glob="**/*.txt",
                loader_cls=TextLoader,
                loader_kwargs={"encoding": "utf-8"},
            )
            documents = loader.load()
            logger.info(f"成功加载 {len(documents)} 个文档")
            return documents
        except Exception as e:
            logger.error(f"加载文档时出错: {str(e)}")
            return []

    def split_documents(self, documents: List[Document]) -> List[Document]:
        """
        将文档分割成更小的块

        Args:
            documents: 要分割的文档

        Returns:
            分割后的文档块
        """
        if not documents:
            return []

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
            separators=["\n\n", "\n", "。", "，", " ", ""],
        )

        chunks = text_splitter.split_documents(documents)
        logger.info(f"文档已分割为 {len(chunks)} 个块")
        return chunks

    def create_or_load_vector_store(self, documents: List[Document] = None) -> bool:
        """
        创建或加载向量存储

        Args:
            documents: 要索引的文档，如果为None则尝试加载现有的向量库

        Returns:
            是否成功
        """
        try:
            vector_store_path = os.path.join(os.getcwd(), VECTOR_DB_PATH)

            if documents and len(documents) > 0:
                # 创建新的向量存储
                self.vector_store = FAISS.from_documents(
                    documents=documents, embedding=self.embeddings
                )
                # 保存向量存储
                os.makedirs(vector_store_path, exist_ok=True)
                self.vector_store.save_local(vector_store_path)
                logger.info(f"成功创建并持久化向量存储到 {vector_store_path}")
            elif os.path.exists(vector_store_path):
                # 加载现有向量存储
                self.vector_store = FAISS.load_local(vector_store_path, self.embeddings)
                logger.info(f"成功加载现有向量存储 {vector_store_path}")
            else:
                logger.warning("没有文档提供，且向量存储不存在")
                return False

            self.is_initialized = True
            return True
        except Exception as e:
            logger.error(f"创建或加载向量存储时出错: {str(e)}")
            return False

    def initialize(self) -> bool:
        """
        初始化知识库

        Returns:
            是否成功初始化
        """
        if self.is_initialized:
            return True

        # 如果有文档目录，则加载并索引文档
        if self.documents_dir:
            documents = self.load_documents()
            chunks = self.split_documents(documents)
            return self.create_or_load_vector_store(chunks)
        else:
            # 否则尝试加载现有向量库
            return self.create_or_load_vector_store()

    def retrieve(self, query: str, top_k: int = 3) -> List[Document]:
        """
        根据查询检索相关文档

        Args:
            query: 用户查询
            top_k: 返回的最相关文档数量

        Returns:
            相关文档列表
        """
        if not self.is_initialized:
            success = self.initialize()
            if not success:
                logger.error("知识库未初始化")
                return []

        try:
            docs = self.vector_store.similarity_search(query, k=top_k)
            logger.info(f"检索到 {len(docs)} 个相关文档")
            return docs
        except Exception as e:
            logger.error(f"检索文档时出错: {str(e)}")
            return []

    def get_relevant_context(self, query: str, top_k: int = 3) -> str:
        """
        获取与查询相关的上下文

        Args:
            query: 用户查询
            top_k: 返回的最相关文档数量

        Returns:
            合并后的相关上下文
        """
        docs = self.retrieve(query, top_k)
        if not docs:
            return ""

        # 合并所有检索到的文档内容
        context = "\n\n".join([doc.page_content for doc in docs])
        return context
