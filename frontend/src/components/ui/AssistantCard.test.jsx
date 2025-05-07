import { render, screen, fireEvent } from '@testing-library/react';
import AIChatCard from './AssistantCard';

describe('AIChatCard Component', () => {
  it('renders the initial bot message', () => {
    render(<AIChatCard />);

    expect(screen.getByText('Hi! How can I assist you today?')).toBeInTheDocument();
  });

  it('allows the user to send a message', () => {
    render(<AIChatCard />);

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Typing...')).toBeInTheDocument();
  });

  it('displays a simulated bot response', async () => {
    jest.useFakeTimers();
    render(<AIChatCard />);

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    jest.advanceTimersByTime(1000);

    expect(screen.getByText('This is a simulated response. How else can I help?')).toBeInTheDocument();
    jest.useRealTimers();
  });
});