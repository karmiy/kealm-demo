"""
API 接口模块
提供与前端交互的接口
"""

import os
import sys
import logging
from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 确保可以导入项目模块
backend_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(backend_dir)
demo_langchain_dir = os.path.dirname(project_dir)
sys.path.append(demo_langchain_dir)
sys.path.append(backend_dir)  # 添加后端目录到路径

from base.llm import llm
from agent.chat_agent import ChatAgent
from knowledge.retriever import KnowledgeRetriever
from conversation.manager import ConversationManager
from config.settings import MAX_HISTORY_LENGTH

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 创建 FastAPI 应用
# 构建 API 的现代、快速（高性能）的 Python Web 服务器
app = FastAPI(title="简易聊天机器人 API", description="基于 LangChain 的聊天机器人后端")

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源，实际生产环境中应该限制
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 定义的请求数据模型类
# 在 FastAPI 作用：
# 1、请求体验证是否是有效的 JSON
# 2、类型转换
# 3、自动生成 API 文档
# 4、类型提示
class MessageRequest(BaseModel):
    """消息请求模型"""

    session_id: Optional[str] = None
    message: str


class SessionRequest(BaseModel):
    """会话请求模型"""

    session_id: str


class CreateSessionRequest(BaseModel):
    """创建会话请求模型"""

    title: Optional[str] = "新会话"


class UpdateSessionTitleRequest(BaseModel):
    """更新会话标题请求模型"""

    session_id: str
    title: str


# 初始化组件
docs_path = os.path.join(backend_dir, "docs/pokemon")
knowledge_retriever = KnowledgeRetriever(documents_dir=docs_path)
chat_agent = ChatAgent(knowledge_retriever=knowledge_retriever)
conversation_manager = ConversationManager(chat_agent=chat_agent)


@app.get("/")
async def root():
    """API 根路径"""
    return {"message": "聊天机器人 API 已成功运行"}


@app.post("/chat")
async def chat(request: MessageRequest):
    """
    处理聊天请求

    Args:
        request: 包含会话 ID 和用户消息的请求

    Returns:
        AI 助手的回复
    """
    try:
        result = conversation_manager.process_message(
            session_id=request.session_id, user_message=request.message
        )
        return result
    except Exception as e:
        logger.error(f"处理聊天请求时出错: {str(e)}")
        raise HTTPException(status_code=500, detail=f"处理请求失败: {str(e)}")


@app.post("/sessions/create")
async def create_session(request: CreateSessionRequest = None):
    """
    创建新的聊天会话

    Args:
        request: 可选的请求体，包含会话标题

    Returns:
        新创建的会话 ID
    """
    try:
        title = "新会话"
        if request and request.title:
            title = request.title
        session_id = conversation_manager.create_session(title=title)
        return {"session_id": session_id}
    except Exception as e:
        logger.error(f"创建会话时出错: {str(e)}")
        raise HTTPException(status_code=500, detail=f"创建会话失败: {str(e)}")


@app.get("/sessions/list")
async def list_sessions():
    """
    获取所有活跃会话列表

    Returns:
        会话列表
    """
    try:
        sessions = conversation_manager.list_sessions()
        return {"sessions": sessions}
    except Exception as e:
        logger.error(f"获取会话列表时出错: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取会话列表失败: {str(e)}")


@app.post("/sessions/delete")
async def delete_session(request: SessionRequest):
    """
    删除指定会话

    Args:
        request: 包含会话 ID 的请求

    Returns:
        操作结果
    """
    try:
        success = conversation_manager.delete_session(request.session_id)
        if not success:
            raise HTTPException(
                status_code=404, detail=f"会话 {request.session_id} 不存在"
            )
        return {"success": True, "message": f"会话 {request.session_id} 已删除"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"删除会话时出错: {str(e)}")
        raise HTTPException(status_code=500, detail=f"删除会话失败: {str(e)}")


@app.post("/sessions/update-title")
async def update_session_title(request: UpdateSessionTitleRequest):
    """
    更新会话标题

    Args:
        request: 包含会话 ID 和新标题的请求

    Returns:
        操作结果
    """
    try:
        success = conversation_manager.update_session_title(
            request.session_id, request.title
        )
        if not success:
            raise HTTPException(
                status_code=404, detail=f"会话 {request.session_id} 不存在"
            )
        return {"success": True, "message": f"会话 {request.session_id} 标题已更新"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"更新会话标题时出错: {str(e)}")
        raise HTTPException(status_code=500, detail=f"更新会话标题失败: {str(e)}")


@app.get("/sessions/{session_id}/history")
async def get_history(session_id: str):
    """
    获取指定会话的历史记录

    Args:
        session_id: 会话 ID

    Returns:
        会话历史记录
    """
    try:
        history = conversation_manager.get_history(session_id)
        return {"session_id": session_id, "history": history}
    except Exception as e:
        logger.error(f"获取历史记录时出错: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取历史记录失败: {str(e)}")


@app.get("/health")
async def health_check():
    """
    健康检查接口

    Returns:
        API 状态信息
    """
    return {
        "status": "healthy",
        "components": {
            "llm": "connected" if llm else "not_connected",
            "knowledge_retriever": (
                "initialized"
                if knowledge_retriever.is_initialized
                else "not_initialized"
            ),
        },
    }
