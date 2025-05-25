import { useEffect, useState } from 'react';
import { getMessages } from '../api';
import { MessageDto } from '../types';
import { MessageForm } from './MessageForm';

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
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
          <tr style={{ borderBottom: '2px solid #7a83ff' }}>
            <th style={{ textAlign: 'center', padding: '8px' }}>ID</th>
            <th style={{ textAlign: 'center', padding: '8px' }}>Content</th>
          </tr>
          </thead>
          <tbody>
          {messages.map((msg) => (
              <tr key={msg.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '8px' }}>{msg.id}</td>
                <td style={{ padding: '8px' }}>{msg.content}</td>
              </tr>
          ))}
          </tbody>
        </table>

        <MessageForm onNewMessage={loadMessages} />
      </div>
  );
};
