import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar, Spin, Divider, Typography, Card, Layout } from 'antd';
import { SendOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import './ChatInterface.css';

const { Content } = Layout;
const { Text } = Typography;
const { TextArea } = Input;

// 消息类型定义
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
}

const ChatInterface: React.FC = () => {
  // 消息列表状态
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是基于LangChain的AI助手，有什么可以帮到你的吗？',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  
  // 输入框状态
  const [inputValue, setInputValue] = useState('');
  
  // 加载状态
  const [isLoading, setIsLoading] = useState(false);
  
  // 聊天区域的引用，用于自动滚动
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // 处理消息发送
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
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
      // 这里将来会替换为实际的API调用
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 模拟机器人回复
      const botResponse = "这是一个模拟回复。在实际项目中，这里会调用后端API获取LLM的响应。";
      
      // 更新机器人回复消息
      setMessages(prev => 
        prev.map(msg => 
          msg.id === `${newId}-response` 
            ? { ...msg, content: botResponse, isLoading: false } 
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

  return (
    <Layout className="chat-interface">
      <Content className="chat-container">
        <Card className="chat-card" bordered={false}>
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
                          <div className="message-content">{message.content}</div>
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
              placeholder="输入您的问题..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              disabled={isLoading}
              className="message-input"
            />
            <Button
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            />
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default ChatInterface; 