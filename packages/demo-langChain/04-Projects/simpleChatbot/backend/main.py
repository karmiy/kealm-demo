"""
应用入口文件
用于启动聊天机器人后端服务
"""

import os
import sys
import uvicorn
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


def main():
    """应用主函数，启动API服务"""
    logger.info("正在启动聊天机器人后端服务...")

    # 使用uvicorn启动服务
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)


if __name__ == "__main__":
    # 确保当前目录在Python路径中
    current_dir = os.path.dirname(os.path.abspath(__file__))
    if current_dir not in sys.path:
        sys.path.insert(0, current_dir)  # 将当前目录添加到路径最前面

    main()
