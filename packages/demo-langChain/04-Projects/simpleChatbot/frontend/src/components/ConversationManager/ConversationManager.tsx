import React, { useState } from 'react';
import { Layout, Menu, Button, Modal, Input, Typography, Divider } from 'antd';
import { PlusOutlined, MessageOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ChatInterface from '../ChatInterface';
import './ConversationManager.css';

const { Sider } = Layout;
const { Text, Title } = Typography;

// 会话类型定义
interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationManager: React.FC = () => {
  // 会话列表状态
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: '新对话',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  
  // 当前选中的会话ID
  const [selectedConversationId, setSelectedConversationId] = useState<string>('1');
  
  // 侧边栏折叠状态
  const [collapsed, setCollapsed] = useState(false);
  
  // 创建/编辑会话的模态框状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [modalInput, setModalInput] = useState('');
  const [editingConversationId, setEditingConversationId] = useState<string | null>(null);

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
      onOk: () => {
        const updatedConversations = conversations.filter(conv => conv.id !== id);
        setConversations(updatedConversations);
        
        // 如果删除的是当前选中的会话，则选择第一个会话或创建新会话
        if (id === selectedConversationId) {
          if (updatedConversations.length > 0) {
            setSelectedConversationId(updatedConversations[0].id);
          } else {
            const newConversation = createNewConversation();
            setConversations([newConversation]);
            setSelectedConversationId(newConversation.id);
          }
        }
      },
    });
  };

  // 处理模态框确认
  const handleModalOk = () => {
    if (!modalInput.trim()) {
      return;
    }

    if (modalMode === 'create') {
      const newConversation = createNewConversation(modalInput);
      setConversations([newConversation, ...conversations]);
      setSelectedConversationId(newConversation.id);
    } else if (modalMode === 'edit' && editingConversationId) {
      setConversations(
        conversations.map(conv =>
          conv.id === editingConversationId
            ? { ...conv, title: modalInput, updatedAt: new Date() }
            : conv
        )
      );
    }

    setIsModalVisible(false);
  };

  // 处理模态框取消
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // 创建新会话对象
  const createNewConversation = (title = '新对话'): Conversation => {
    const now = new Date();
    return {
      id: Date.now().toString(),
      title,
      createdAt: now,
      updatedAt: now,
    };
  };

  // 切换会话
  const handleSelectConversation = (id: string) => {
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
        >
          {conversations.map(conversation => (
            <Menu.Item 
              key={conversation.id}
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
          ))}
        </Menu>
      </Sider>
      
      <Layout className="chat-layout">
        <ChatInterface />
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