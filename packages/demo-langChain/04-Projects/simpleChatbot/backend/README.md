# 简易聊天机器人后端

基于 LangChain 和 FastAPI 构建的聊天机器人后端，支持知识检索增强和多轮对话。

## 项目结构

```
backend/
│
├── agent/                 # 智能代理模块
│   └── chat_agent.py      # 聊天智能代理实现
│
├── config/                # 配置模块
│   └── settings.py        # 全局配置设置
│
├── conversation/          # 对话管理模块
│   └── manager.py         # 对话管理器实现
│
├── knowledge/             # 知识检索模块
│   └── retriever.py       # 知识检索器实现
│
├── api.py                 # API 接口实现
├── main.py                # 应用入口
└── README.md              # 说明文档
```

## 功能特性

- 基于 LangChain 的智能代理，能够处理复杂查询
- 支持 RAG (检索增强生成) 模式，可以从文档中检索相关信息
- 使用 FAISS 作为高效向量存储，无需安装额外的 C++ 编译工具
- 多会话管理，支持同时处理多个独立对话
- 支持对话历史记录持久化
- RESTful API 接口，便于与前端集成

## 依赖项

- Python 3.8+
- FastAPI
- LangChain
- langchain_openai
- pydantic
- uvicorn
- langchain_community
- sentence-transformers (嵌入模型)
- faiss-cpu (向量索引库)

## 安装与启动

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 配置环境变量

在项目根目录创建 `.env` 文件，添加以下内容：

```
api_key=your_api_key_here
base_url=your_base_url_here
```

### 3. 准备知识库（可选）

如果需要使用知识检索功能，请准备文本文档并放入指定目录，然后在启动时配置该目录路径。

### 4. 启动后端服务

```bash
cd packages/demo-langChain/04-Projects/simpleChatbot/backend
python main.py
```

服务将在 http://localhost:8000 上运行。

## API 端点

### 聊天接口

`POST /chat`
- 请求体: `{"session_id": "可选的会话 ID", "message": "用户消息"}`
- 响应: `{"session_id": "会话 ID", "response": "AI 回复", "timestamp": "时间戳"}`

### 会话管理

`POST /sessions/create`
- 响应: `{"session_id": "新创建的会话 ID"}`

`GET /sessions/list`
- 响应: `{"sessions": [会话列表]}`

`POST /sessions/delete`
- 请求体: `{"session_id": "要删除的会话 ID"}`
- 响应: `{"success": true, "message": "删除成功消息"}`

`GET /sessions/{session_id}/history`
- 响应: `{"session_id": "会话 ID", "history": [历史消息列表]}`

### 系统状态

`GET /health`
- 响应: 系统状态信息

## 扩展与定制

### 添加新工具

要添加新工具，请修改 `agent/chat_agent.py` 文件中的 `_create_tools` 方法：

```python
def _create_tools(self) -> List[Tool]:
    tools = []
    
    # 添加现有工具...
    
    # 添加新工具
    @Tool.from_function
    def new_tool(param: str) -> str:
        """工具描述"""
        # 工具实现
        return result
        
    tools.append(new_tool)
    
    return tools
```

### 修改系统提示

可以在 `config/settings.py` 中修改 `SYSTEM_PROMPT` 变量来自定义 AI 助手的行为风格。 