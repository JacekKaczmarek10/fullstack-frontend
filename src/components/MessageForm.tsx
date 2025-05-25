import { useState } from 'react';
import { addMessage } from '../api';
import DOMPurify from 'dompurify';

interface Props {
  onNewMessage: () => void;
}

export const MessageForm: React.FC<Props> = ({ onNewMessage }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const sanitizedContent = DOMPurify.sanitize(content.trim());
      await addMessage({ content: sanitizedContent });
      setContent('');
      onNewMessage();
    } catch (err) {
      console.error('Error adding message:', err);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter message"
        />
        <button type="submit">Send</button>
      </form>
  );
};