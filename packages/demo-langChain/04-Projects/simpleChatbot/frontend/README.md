# 简易聊天机器人前端

基于 React 和 TypeScript 构建的聊天机器人前端界面，提供直观的用户交互和多会话管理功能。

## 项目结构

```
frontend/
│
├── public/                # 静态资源
│   ├── index.html         # HTML 入口文件
│   └── favicon.ico        # 网站图标
│
├── src/                   # 源代码
│   ├── components/        # 组件
│   │   ├── ChatInterface/       # 聊天界面组件
│   │   │   ├── ChatInterface.tsx      # 聊天界面实现
│   │   │   └── ChatInterface.css      # 聊天界面样式
│   │   │
│   │   └── ConversationManager/  # 会话管理组件
│   │       ├── ConversationManager.tsx # 会话管理实现
│   │       └── ConversationManager.css # 会话管理样式
│   │
│   ├── services/          # 服务
│   │   └── api.ts         # API 服务封装
│   │
│   ├── App.tsx            # 应用入口组件
│   ├── index.tsx          # 应用入口文件
│   └── App.css            # 全局样式
│
├── package.json           # 依赖配置
├── tsconfig.json          # TypeScript 配置
└── README.md              # 说明文档
```

## 功能特性

- 现代化的聊天界面，支持发送和接收消息
- 多会话管理，可创建、切换和删除会话
- 显示消息历史记录和引用来源
- 响应式设计，适配各种屏幕尺寸
- 与后端 API 完美集成，实现无缝交互
- 优雅的加载和错误处理

## 依赖项

- React 18+
- TypeScript
- Ant Design 组件库
- Axios 网络请求库

## 安装与启动

### 1. 安装依赖

```bash
npm install
# 或者
yarn
```

### 2. 配置环境变量

在项目根目录创建 `.env` 文件，添加以下内容：

```
REACT_APP_API_BASE_URL=http://localhost:8000
```

### 3. 启动开发服务器

```bash
npm start
# 或者
yarn start
```

应用将在 http://localhost:3000 上运行。

## 构建生产版本

```bash
npm run build
# 或者
yarn build
```

构建后的文件将生成在 `build` 目录中，可以部署到任何静态文件服务器。

## 与后端集成

前端通过 API 服务与后端进行通信，主要功能包括：

- 发送聊天消息和接收回复
- 创建、列出和删除会话
- 获取会话历史记录

请确保后端服务已正常运行，并且 `.env` 文件中的 API 地址配置正确。

## 自定义与扩展

### 修改主题样式

可以在 `src/App.css` 和各组件的 CSS 文件中修改样式来自定义界面外观。

### 添加新功能

如需添加新功能，可以在 `src/components` 目录下创建新的组件，或者扩展现有组件。

### 添加新的 API 服务

如需添加新的 API 服务，可以在 `src/services/api.ts` 文件中扩展 ApiService 类。
