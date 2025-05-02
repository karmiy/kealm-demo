import axios from 'axios';

// API基础URL，可以根据不同环境配置
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 消息请求接口
export interface MessageRequest {
  session_id?: string;
  message: string;
}

// 消息响应接口
export interface MessageResponse {
  response: string;
  session_id: string;
  timestamp: string;
  sources?: string[];
}

// 会话接口
export interface Session {
  session_id: string;
  created_at: string;
  title: string;
}

// 历史记录消息接口
export interface HistoryMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// API服务类
class ApiService {
  // 发送聊天消息
  async sendMessage(request: MessageRequest): Promise<MessageResponse> {
    try {
      const response = await api.post('/chat', request);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // 创建新会话
  async createSession(title?: string): Promise<{ session_id: string }> {
    try {
      const response = await api.post('/sessions/create', { title });
      return response.data;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  // 获取会话列表
  async listSessions(): Promise<{ sessions: Session[] }> {
    try {
      const response = await api.get('/sessions/list');
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  }

  // 删除会话
  async deleteSession(session_id: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/sessions/delete', { session_id });
      return response.data;
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  }

  // 更新会话标题
  async updateSessionTitle(session_id: string, title: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post('/sessions/update-title', { session_id, title });
      return response.data;
    } catch (error) {
      console.error('Error updating session title:', error);
      throw error;
    }
  }

  // 获取会话历史记录
  async getSessionHistory(session_id: string): Promise<{ session_id: string; history: HistoryMessage[] }> {
    try {
      const response = await api.get(`/sessions/${session_id}/history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching session history:', error);
      throw error;
    }
  }

  // 健康检查
  async healthCheck(): Promise<{ status: string; components: Record<string, string> }> {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }

  // 根状态检查
  async rootCheck(): Promise<{ message: string }> {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Error checking root:', error);
      throw error;
    }
  }
}

// 导出API服务实例
export const apiService = new ApiService(); 