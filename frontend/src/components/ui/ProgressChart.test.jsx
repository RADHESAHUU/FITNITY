import { render, screen } from '@testing-library/react';
import ProgressChartCard from './ProgressChart';

describe('ProgressChartCard Component', () => {
  it('renders the chart title', () => {
    render(<ProgressChartCard />);

    expect(screen.getByText('Progress Chart')).toBeInTheDocument();
  });

  it('displays a loading spinner when isLoading is true', () => {
    render(<ProgressChartCard isLoading={true} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders the chart when valid data is provided', () => {
    const mockData = {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          label: 'Test Dataset',
          data: [10, 20, 30],
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
        },
      ],
    };

    render(<ProgressChartCard data={mockData} />);

    expect(screen.getByText('Test Dataset')).toBeInTheDocument();
  });

  // Added test for invalid data
  it('displays an error message when data is invalid', () => {
    render(<ProgressChartCard data={null} />);

    expect(screen.getByText('Invalid chart data')).toBeInTheDocument();
  });
});