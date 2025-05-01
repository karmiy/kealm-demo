"""
对话管理模块
负责管理对话历史记录和会话状态
"""

import uuid
import os
import sys
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime

# 确保可以导入项目模块
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(backend_dir)  # 添加后端目录到路径

from config.settings import MAX_HISTORY_LENGTH
from agent.chat_agent import ChatAgent

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ConversationManager:
    """对话管理器类，负责管理对话会话和历史记录"""

    def __init__(self, chat_agent: ChatAgent):
        """
        初始化对话管理器

        Args:
            chat_agent: 聊天智能代理实例
        """
        self.chat_agent = chat_agent
        self.active_sessions = {}  # 存储活跃会话，格式: {session_id: session_data}

    def create_session(self) -> str:
        """
        创建新的对话会话

        Returns:
            新会话的ID
        """
        session_id = str(uuid.uuid4())
        self.active_sessions[session_id] = {
            "id": session_id,
            "created_at": datetime.now().isoformat(),
            "last_activity": datetime.now().isoformat(),
            "history": [],
        }
        logger.info(f"创建新会话: {session_id}")
        return session_id

    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        """
        获取会话信息

        Args:
            session_id: 会话ID

        Returns:
            会话数据，如果不存在则返回None
        """
        return self.active_sessions.get(session_id)

    def list_sessions(self) -> List[Dict[str, Any]]:
        """
        获取所有活跃会话的简要信息

        Returns:
            会话信息列表
        """
        return [
            {
                "id": session_id,
                "created_at": session_data["created_at"],
                "last_activity": session_data["last_activity"],
                "message_count": len(session_data["history"]),
            }
            for session_id, session_data in self.active_sessions.items()
        ]

    def delete_session(self, session_id: str) -> bool:
        """
        删除会话

        Args:
            session_id: 会话ID

        Returns:
            操作是否成功
        """
        if session_id in self.active_sessions:
            del self.active_sessions[session_id]
            logger.info(f"删除会话: {session_id}")
            return True
        return False

    def process_message(self, session_id: str, user_message: str) -> Dict[str, Any]:
        """
        处理用户消息

        Args:
            session_id: 会话ID
            user_message: 用户消息内容

        Returns:
            包含响应的字典
        """
        # 获取或创建会话
        if session_id not in self.active_sessions:
            session_id = self.create_session()

        session = self.active_sessions[session_id]
        history = session["history"]

        # 调用智能代理处理消息
        response, updated_history = self.chat_agent.process_query(user_message, history)

        # 更新会话状态
        self.active_sessions[session_id]["history"] = updated_history
        self.active_sessions[session_id]["last_activity"] = datetime.now().isoformat()

        # 限制历史记录长度
        if (
            len(updated_history) > MAX_HISTORY_LENGTH * 2
        ):  # 乘以2是因为每次对话有用户和助手两条消息
            self.active_sessions[session_id]["history"] = updated_history[
                -MAX_HISTORY_LENGTH * 2 :
            ]

        return {
            "session_id": session_id,
            "response": response,
            "timestamp": datetime.now().isoformat(),
        }

    def get_history(self, session_id: str) -> List[Dict[str, Any]]:
        """
        获取会话历史记录

        Args:
            session_id: 会话ID

        Returns:
            历史记录列表
        """
        if session_id not in self.active_sessions:
            return []

        history = self.active_sessions[session_id]["history"]

        # 为每条消息添加时间戳（如果原始历史记录中没有）
        formatted_history = []
        for i, message in enumerate(history):
            if isinstance(message, dict) and "timestamp" not in message:
                message_with_timestamp = message.copy()
                # 使用一个近似时间戳，实际情况下应该在消息创建时记录
                message_with_timestamp["timestamp"] = datetime.now().isoformat()
                formatted_history.append(message_with_timestamp)
            else:
                formatted_history.append(message)

        return formatted_history
