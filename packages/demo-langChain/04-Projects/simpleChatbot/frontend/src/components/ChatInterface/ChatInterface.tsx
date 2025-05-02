import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar, Spin, Divider, Typography, Card, Layout, message } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import './ChatInterface.css';
import { apiService, MessageResponse, HistoryMessage } from '../../services/api';

const { Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

// 组件Props接口
interface ChatInterfaceProps {
  sessionId: string;
}

// 消息类型定义
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
  sources?: string[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ sessionId }) => {
  // 消息列表状态
  const [messages, setMessages] = useState<Message[]>([]);
  
  // 输入框状态
  const [inputValue, setInputValue] = useState('');
  
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);
  
  // 聊天区域的引用，用于自动滚动
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 当会话ID变化时获取历史消息
  useEffect(() => {
    if (sessionId) {
      fetchSessionHistory(sessionId);
    } else {
      // 如果没有会话ID，清空消息列表，显示欢迎消息
      setMessages([
        {
          id: '1',
          content: '你好！我是基于 LangChain 的 AI 助手，请创建或选择一个会话开始聊天。',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [sessionId]);

  // 获取会话历史记录
  const fetchSessionHistory = async (sessionId: string) => {
    setIsLoading(true);
    try {
      const response = await apiService.getSessionHistory(sessionId);
      
      if (response && response.history) {
        // 将API返回的历史记录转换为本地消息格式
        const historyMessages: Message[] = response.history.map((msg: HistoryMessage, index: number) => ({
          id: `history-${index}`,
          content: msg.content,
          sender: msg.role === 'user' ? 'user' : 'bot',
          timestamp: new Date(msg.timestamp),
        }));
        
        // 如果没有历史记录，添加欢迎消息
        if (historyMessages.length === 0) {
          historyMessages.push({
            id: 'welcome',
            content: '你好！我是基于LangChain的AI助手，有什么可以帮到你的吗？',
            sender: 'bot',
            timestamp: new Date(),
          });
        }
        
        setMessages(historyMessages);
      }
    } catch (error) {
      console.error('Failed to fetch session history:', error);
      message.error('获取历史记录失败');
      
      // 出错时显示默认欢迎消息
      setMessages([
        {
          id: 'error-fallback',
          content: '你好！我是基于LangChain的AI助手，有什么可以帮到你的吗？',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // 处理消息发送
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return;
    
    // 生成新消息ID
    const newId = Date.now().toString();
    
    // 创建并添加用户消息
    const userMessage: Message = {
      id: newId,
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    // 清空输入框
    setInputValue('');
    
    // 更新消息列表，添加用户消息
    setMessages(prev => [...prev, userMessage]);
    
    // 添加机器人"思考中"的消息
    const botLoadingMessage: Message = {
      id: `${newId}-response`,
      content: '',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true,
    };
    
    setIsLoading(true);
    setMessages(prev => [...prev, botLoadingMessage]);
    
    try {
      // 调用API发送消息
      const response = await apiService.sendMessage({
        session_id: sessionId,
        message: userMessage.content
      });
      
      // 更新机器人回复消息
      setMessages(prev => 
        prev.map(msg => 
          msg.id === `${newId}-response` 
            ? { 
                ...msg, 
                content: response.response, 
                isLoading: false,
                sources: response.sources || [],
              } 
            : msg
        )
      );
    } catch (error) {
      // 处理错误
      setMessages(prev => 
        prev.map(msg => 
          msg.id === `${newId}-response` 
            ? { ...msg, content: '抱歉，发生了错误，请稍后再试。', isLoading: false } 
            : msg
        )
      );
      console.error('Error sending message:', error);
      message.error('发送消息失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 处理回车键发送消息
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 渲染源引用
  const renderSources = (sources?: string[]) => {
    if (!sources || sources.length === 0) return null;
    
    return (
      <div className="message-sources">
        <Divider orientation="left">参考资料</Divider>
        <ul>
          {sources.map((source, index) => (
            <li key={index}>
              <Text type="secondary" ellipsis={{ tooltip: source }}>
                {source}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Layout className="chat-interface">
      <Content className="chat-container">
        <Card className="chat-card" variant='borderless'>
          <div className="chat-header">
            <Typography.Title level={4}>LangChain 智能助手</Typography.Title>
            <Divider />
          </div>
          
          <div className="messages-container">
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(message: Message) => (
                <List.Item className={`message-item ${message.sender}`}>
                  <List.Item.Meta
                    avatar={
                      message.sender === 'user' ? (
                        <Avatar icon={<UserOutlined />} className="user-avatar" />
                      ) : (
                        <Avatar icon={<RobotOutlined />} className="bot-avatar" />
                      )
                    }
                    title={null}
                    description={
                      <div className={`message-bubble ${message.sender}`}>
                        {message.isLoading ? (
                          <Spin size="small" />
                        ) : (
                          <>
                            <div className="message-content">{message.content}</div>
                            {renderSources(message.sources)}
                          </>
                        )}
                        <div className="message-timestamp">
                          <Text 
                            type={message.sender === 'user' ? undefined : "secondary"} 
                            className="timestamp"
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </Text>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <div ref={messagesEndRef} />
          </div>
          
          <div className="input-container">
            <TextArea
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={sessionId ? "输入您的问题..." : "请先创建或选择一个会话"}
              autoSize={{ minRows: 1, maxRows: 4 }}
              disabled={isLoading || !sessionId}
              className="message-input"
            />
            <Button
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading || !sessionId}
            />
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default ChatInterface; 