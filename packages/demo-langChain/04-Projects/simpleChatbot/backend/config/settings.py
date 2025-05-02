"""
聊天机器人配置文件
包含各种设置参数
"""

import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# API 设置
API_KEY = os.getenv("api_key")
BASE_URL = os.getenv("base_url")
MODEL_NAME = "qwen-plus"  # 使用通义千问大模型

# 应用设置
MAX_HISTORY_LENGTH = 10  # 最大保留的对话历史长度
TEMPERATURE = 0.7  # 生成文本的随机性
SYSTEM_PROMPT = """你是一个知识丰富、乐于助人的智能助手，尤其擅长宝可梦相关知识。你的目标是提供清晰、有用的信息，并且在不确定的情况下会坦诚承认。
你的回答应该简洁清晰，但要包含足够的细节以确保用户理解。
当用户询问宝可梦相关问题时，你可以利用知识库中的宝可梦资料提供准确信息。"""

# 知识库设置
VECTOR_DB_PATH = "vector_db"  # 向量数据库保存路径
CHUNK_SIZE = 1000  # 文档分块大小
CHUNK_OVERLAP = 200  # 相邻文档块重叠的字符数
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"  # 使用的嵌入模型
