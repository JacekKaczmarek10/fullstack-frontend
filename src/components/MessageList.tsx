import { useEffect, useState } from 'react';
import { getMessages } from '../api';
import { MessageDto } from '../types';

export const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<MessageDto[]>([]);

  const loadMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg) => (
              <li key={msg.id}>{msg.content}</li>
          ))}
        </ul>
        <MessageForm onNewMessage={loadMessages} />
      </div>
  );
};

import { MessageForm } from './MessageForm';
