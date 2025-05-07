import { render, screen } from '@testing-library/react';
import YogaCard from './YogaCard';
import { BrowserRouter } from 'react-router-dom';

describe('YogaCard Component', () => {
  it('renders the yoga session name and duration', () => {
    render(
      <BrowserRouter>
        <YogaCard sessionName="Morning Yoga" duration="30 mins" />
      </BrowserRouter>
    );

    expect(screen.getByText("Today's Yoga Session")).toBeInTheDocument();
    expect(screen.getByText('Session: Morning Yoga')).toBeInTheDocument();
    expect(screen.getByText('Duration: 30 mins')).toBeInTheDocument();
  });

  it('renders the Start Session button', () => {
    render(
      <BrowserRouter>
        <YogaCard />
      </BrowserRouter>
    );

    expect(screen.getByRole('button', { name: /start session/i })).toBeInTheDocument();
  });
});