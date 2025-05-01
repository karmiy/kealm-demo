# LangChain 聊天机器人项目

这是一个基于 LangChain 构建的聊天机器人应用，包含前端和后端部分。

## 项目结构

```
simpleChatbot/
├── backend/               # 后端 API 服务
│   ├── agent/             # 智能代理模块
│   ├── config/            # 配置模块
│   ├── conversation/      # 对话管理模块
│   ├── knowledge/         # 知识检索模块
│   ├── api.py             # API 接口定义
│   ├── main.py            # 应用入口
│   └── requirements.txt   # 依赖包
└── frontend/              # React 前端
    ├── public/            # 静态资源
    ├── src/               # 源代码
    │   ├── components/    # 组件
    │   │   ├── ChatInterface/     # 聊天界面组件
    │   │   └── ConversationManager/ # 会话管理组件
    │   ├── services/      # 服务
    │   │   └── api.ts     # API 服务
    │   └── App.tsx        # 应用入口
    ├── package.json       # 依赖描述
    └── tsconfig.json      # TypeScript 配置
```

## 功能特性

- 基于 LangChain 的智能对话
- 知识库检索增强对话
- 多会话管理
- 对话历史记录
- 现代化 React 界面

## 运行说明

### 后端服务

1. 进入后端目录
```bash
cd backend
```

2. 安装依赖
```bash
pip install -r requirements.txt
```

3. 运行后端服务
```bash
python main.py
```

后端服务将在 http://localhost:8000 运行

### 前端应用

1. 进入前端目录
```bash
cd frontend
```

2. 安装依赖
```bash
npm install
# 或者
yarn
```

3. 运行前端应用
```bash
npm start
# 或者
yarn start
```

前端应用将在 http://localhost:3000 运行

## API 文档

### 基础 URL
```
http://localhost:8000
```

### 端点列表

#### 健康检查
```
GET /health
```

#### 发送聊天消息
```
POST /chat
```
请求体:
```json
{
  "session_id": "可选的会话 ID",
  "message": "用户消息内容"
}
```

#### 创建新会话
```
POST /sessions/create
```

#### 获取会话列表
```
GET /sessions/list
```

#### 删除会话
```
POST /sessions/delete
```
请求体:
```json
{
  "session_id": "要删除的会话 ID"
}
```

#### 获取会话历史记录
```
GET /sessions/{session_id}/history
```

## 注意事项

- 前端和后端需要同时运行才能正常使用应用
- 确保 Python 环境中已安装所有必要的依赖
- 默认情况下，后端服务会使用 FAISS 作为向量存储
- 首次运行时，系统会自动下载必要的模型和嵌入

## 故障排除

- 如果出现 CORS 错误，请确保后端 API 已正确配置 CORS 中间件
- 如果前端无法连接到后端，请检查 API_BASE_URL 配置
- 如果遇到 Python 导入错误，请确保使用的是绝对导入方式

## 技术栈

- 后端: Python, FastAPI, LangChain, FAISS
- 前端: React, TypeScript, Ant Design, Axios 