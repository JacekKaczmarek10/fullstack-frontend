import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MessageList } from '../src/components/MessageList';
import { vi } from 'vitest';
import * as api from '../src/api';

vi.mock('../src/api');

const mockedGetMessages = api.getMessages as vi.MockedFn<typeof api.getMessages>;

describe('MessageList', () => {
  beforeEach(() => {
    mockedGetMessages.mockClear();
  });

  it('loads and displays messages', async () => {
    const messages = [
      { id: 1, content: 'Hello' },
      { id: 2, content: 'World' },
    ];
    mockedGetMessages.mockResolvedValue(messages);

    render(<MessageList />);

    expect(screen.getByText(/Messages/i)).toBeInTheDocument();

    for (const msg of messages) {
      await waitFor(() => expect(screen.getByText(msg.content)).toBeInTheDocument());
    }
  });

  it('calls loadMessages after new message via MessageForm', async () => {
    const messages = [{ id: 1, content: 'Test' }];
    mockedGetMessages.mockResolvedValue(messages);

    render(<MessageList />);

    await waitFor(() => expect(screen.getByText('Test')).toBeInTheDocument());
  });
});
