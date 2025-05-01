import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Modal, Input, Typography, Divider, message, MenuProps } from 'antd';
import { PlusOutlined, MessageOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ChatInterface from '../ChatInterface';
import './ConversationManager.css';
import { apiService, Session } from '../../services/api';

const { Sider } = Layout;
const { Text, Title } = Typography;

// 会话类型定义
interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
}

const ConversationManager: React.FC = () => {
  // 会话列表状态
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  // 当前选中的会话ID
  const [selectedConversationId, setSelectedConversationId] = useState<string>('');
  
  // 侧边栏折叠状态
  const [collapsed, setCollapsed] = useState(false);
  
  // 创建/编辑会话的模态框状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [modalInput, setModalInput] = useState('');
  const [editingConversationId, setEditingConversationId] = useState<string | null>(null);
  
  // 加载状态
  const [loading, setLoading] = useState(false);

  // 初始加载会话列表
  useEffect(() => {
    fetchSessions();
  }, []);

  // 获取会话列表
  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await apiService.listSessions();
      const fetchedConversations = response.sessions.map((session: Session) => ({
        id: session.session_id,
        title: session.title,
        createdAt: new Date(session.created_at),
      }));
      
      setConversations(fetchedConversations);
      
      // 如果有会话，选择第一个，否则不选择任何会话
      if (fetchedConversations.length > 0 && !selectedConversationId) {
        setSelectedConversationId(fetchedConversations[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      message.error('获取会话列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 创建新会话
  const handleCreateConversation = () => {
    setModalMode('create');
    setModalInput('');
    setIsModalVisible(true);
  };

  // 编辑会话标题
  const handleEditConversation = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setModalMode('edit');
    setModalInput(title);
    setEditingConversationId(id);
    setIsModalVisible(true);
  };

  // 删除会话
  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个会话吗？此操作不可撤销。',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          await apiService.deleteSession(id);
          const updatedConversations = conversations.filter(conv => conv.id !== id);
          setConversations(updatedConversations);
          
          // 如果删除的是当前选中的会话，则选择第一个会话或不选择任何会话
          if (id === selectedConversationId) {
            if (updatedConversations.length > 0) {
              setSelectedConversationId(updatedConversations[0].id);
            } else {
              setSelectedConversationId('');
            }
          }
          
          message.success('会话已删除');
        } catch (error) {
          console.error('Failed to delete session:', error);
          message.error('删除会话失败');
        }
      },
    });
  };

  // 处理模态框确认
  const handleModalOk = async () => {
    if (!modalInput.trim()) {
      return;
    }

    try {
      if (modalMode === 'create') {
        // 创建新会话
        const response = await apiService.createSession();
        const newSessionId = response.session_id;
        const newConversation: Conversation = {
          id: newSessionId,
          title: modalInput,
          createdAt: new Date(),
        };
        
        setConversations([newConversation, ...conversations]);
        setSelectedConversationId(newConversation.id);
        message.success('新会话已创建');
      } else if (modalMode === 'edit' && editingConversationId) {
        // 编辑会话标题功能API暂未支持，这里只在前端修改
        setConversations(
          conversations.map(conv =>
            conv.id === editingConversationId
              ? { ...conv, title: modalInput }
              : conv
          )
        );
        message.success('会话标题已更新');
      }

      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to process conversation:', error);
      message.error(modalMode === 'create' ? '创建会话失败' : '更新会话标题失败');
    }
  };

  // 处理模态框取消
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // 切换会话
  const handleSelectConversation: MenuProps['onClick'] = (e) => {
    const id = e.key;
    setSelectedConversationId(id);
  };

  // 切换侧边栏折叠状态
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="conversation-manager">
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={toggleCollapsed}
        className="conversation-sider"
        theme="light"
        breakpoint="lg"
      >
        <div className="logo">
          <Title level={4} className={collapsed ? 'hidden' : ''}>LangChain</Title>
          <Text className={collapsed ? 'hidden' : ''}>智能会话助手</Text>
        </div>
        <Divider style={{ margin: '0 0 16px 0' }} />
        
        <div className="new-conversation-button">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateConversation}
            block
          >
            {!collapsed && '新会话'}
          </Button>
        </div>
        
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedConversationId]}
          className="conversation-menu"
          onClick={handleSelectConversation}
          items={conversations.map((conversation, idx) => {
            return {
              key: conversation.id ?? idx,
              label: (
                <div className="conversation-item-content">
                  <div className="conversation-title">{conversation.title}</div>
                  <div className="conversation-actions">
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      size="small"
                      onClick={(e) => handleEditConversation(conversation.id, conversation.title, e)}
                      className="action-button"
                    />
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      size="small"
                      danger
                      onClick={(e) => handleDeleteConversation(conversation.id, e)}
                      className="action-button"
                    />
                  </div>
                </div>
              ),
              icon: <MessageOutlined />,
            }
          })}
        >
          {/* {conversations.map((conversation, idx) => (
            <Menu.Item 
              key={conversation.id ?? idx}
              icon={<MessageOutlined />}
              onClick={() => handleSelectConversation(conversation.id)}
              className="conversation-menu-item"
            >
              <div className="conversation-item-content">
                <div className="conversation-title">{conversation.title}</div>
                <div className="conversation-actions">
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    size="small"
                    onClick={(e) => handleEditConversation(conversation.id, conversation.title, e)}
                    className="action-button"
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    onClick={(e) => handleDeleteConversation(conversation.id, e)}
                    className="action-button"
                  />
                </div>
              </div>
            </Menu.Item>
          ))} */}
        </Menu>
      </Sider>
      
      <Layout className="chat-layout">
        <ChatInterface sessionId={selectedConversationId} />
      </Layout>
      
      <Modal
        title={modalMode === 'create' ? '创建新会话' : '编辑会话标题'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={modalMode === 'create' ? '创建' : '保存'}
        cancelText="取消"
      >
        <Input
          placeholder="输入会话标题"
          value={modalInput}
          onChange={(e) => setModalInput(e.target.value)}
          autoFocus
        />
      </Modal>
    </Layout>
  );
};

export default ConversationManager; 