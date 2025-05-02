"""
聊天智能代理模块
负责分析用户意图、决定使用工具，以及调用 LLM 生成回答
"""

import sys
import os
import logging
from typing import List, Dict, Any, Optional, Tuple

# 导入 LangChain 相关组件
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import Tool
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage

# 确保可以导入项目模块
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
project_dir = os.path.dirname(backend_dir)
demo_langchain_dir = os.path.dirname(project_dir)
sys.path.append(demo_langchain_dir)
sys.path.append(backend_dir)  # 添加后端目录到路径

from base.llm import llm

# 导入项目模块 - 使用绝对导入
from config.settings import SYSTEM_PROMPT, TEMPERATURE
from knowledge.retriever import KnowledgeRetriever

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ChatAgent:
    """聊天智能代理类，负责处理用户查询并生成回答"""

    def __init__(self, knowledge_retriever: Optional[KnowledgeRetriever] = None):
        """
        初始化聊天智能代理

        Args:
            knowledge_retriever: 知识检索器实例
        """
        self.knowledge_retriever = knowledge_retriever
        self.tools = self._create_tools()
        self.agent_executor = self._setup_agent()

    def _create_tools(self) -> List[Tool]:
        """
        创建代理可用的工具

        Returns:
            工具列表
        """
        tools = []

        # 如果有知识检索器，添加知识检索工具
        if self.knowledge_retriever:
            # 定义知识搜索函数
            def search_knowledge(query: str) -> str:
                """
                根据查询搜索知识库，查找与查询相关的信息。
                当用户询问可能在知识库中有答案的问题时使用此工具。
                """
                context = self.knowledge_retriever.get_relevant_context(query)
                if not context:
                    return "未找到相关信息。"
                return context

            # 创建工具 - 修复方法：显式提供 name 和 description 参数
            knowledge_tool = Tool.from_function(
                func=search_knowledge,
                name="搜索知识库",
                description="当需要查找特定信息或回答知识相关问题时，使用此工具搜索知识库",
            )

            tools.append(knowledge_tool)

        # 在这里可以添加更多工具

        return tools

    def _setup_agent(self) -> AgentExecutor:
        """
        设置智能代理

        Returns:
            配置好的代理执行器
        """
        # 创建提示模板
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", SYSTEM_PROMPT),
                MessagesPlaceholder(variable_name="chat_history"),
                ("human", "{input}"),
                MessagesPlaceholder(variable_name="agent_scratchpad"),
            ]
        )

        # 创建 OpenAI Functions Agent
        agent = create_openai_functions_agent(llm, self.tools, prompt)

        # 创建 Agent 执行器
        agent_executor = AgentExecutor(
            agent=agent,
            tools=self.tools,
            verbose=True,
            handle_parsing_errors=True,
        )

        return agent_executor

    def process_query(
        self, query: str, chat_history: List[dict] = None
    ) -> Tuple[str, List[dict]]:
        """
        处理用户查询并生成回答

        Args:
            query: 用户查询
            chat_history: 对话历史

        Returns:
            生成的回答和更新后的对话历史
        """
        # 将对话历史转换为 LangChain 消息格式
        messages = []
        if chat_history:
            for msg in chat_history:
                if msg["role"] == "user":
                    messages.append(HumanMessage(content=msg["content"]))
                elif msg["role"] == "assistant":
                    messages.append(AIMessage(content=msg["content"]))

        try:
            # 调用代理执行器处理查询
            result = self.agent_executor.invoke(
                {"input": query, "chat_history": messages}
            )

            response = result["output"]

            # 更新对话历史
            if not chat_history:
                chat_history = []

            chat_history.append({"role": "user", "content": query})
            chat_history.append({"role": "assistant", "content": response})

            return response, chat_history

        except Exception as e:
            logger.error(f"处理查询时出错: {str(e)}")
            error_msg = (
                "抱歉，我在处理您的请求时遇到了问题。请稍后再试或换一种方式提问。"
            )

            if not chat_history:
                chat_history = []

            chat_history.append({"role": "user", "content": query})
            chat_history.append({"role": "assistant", "content": error_msg})

            return error_msg, chat_history
