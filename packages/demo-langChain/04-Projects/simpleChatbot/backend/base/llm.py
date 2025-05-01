from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os
import tiktoken

load_dotenv()
api_key = os.getenv("api_key")
base_url = os.getenv("base_url")

llm = ChatOpenAI(model="qwen-plus", api_key=api_key, base_url=base_url)
