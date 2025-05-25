import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MessageForm } from '../src/components/MessageForm';
import { vi } from 'vitest';
import * as api from '../src/api';

vi.mock('../src/api');

const mockedAddMessage = api.addMessage as vi.MockedFn<typeof api.addMessage>;

describe('MessageForm', () => {
  beforeEach(() => {
    mockedAddMessage.mockClear();
  });

  it('renders input and button', () => {
    render(<MessageForm onNewMessage={vi.fn()} />);

    expect(screen.getByPlaceholderText(/Enter message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('does not submit empty message', async () => {
    const onNewMessage = vi.fn();
    render(<MessageForm onNewMessage={onNewMessage} />);

    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(mockedAddMessage).not.toHaveBeenCalled();
    expect(onNewMessage).not.toHaveBeenCalled();
  });

  it('submits sanitized message and calls onNewMessage', async () => {
    const onNewMessage = vi.fn();
    mockedAddMessage.mockResolvedValue({
      id: 1,
      content: 'Hello',
      sender: 'TestUser',
    });

    render(<MessageForm onNewMessage={onNewMessage} />);

    const input = screen.getByPlaceholderText(/Enter message/i);
    const button = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: '<script>alert("x")</script> Hello' } });
    fireEvent.click(button);

    await waitFor(() => expect(mockedAddMessage).toHaveBeenCalled());

    expect(mockedAddMessage).toHaveBeenCalledWith({ content: 'Hello' });
    expect(onNewMessage).toHaveBeenCalled();

    expect(input).toHaveValue('');
  });
});