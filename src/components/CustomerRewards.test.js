import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerRewards from './CustomerRewards';

describe('CustomerRewards', () => {
  const mockRewards = {
    total: 200,
    monthly: {
      4: 100,
      5: 50,
      6: 50,
    },
  };

  test('renders component correctly', () => {
    render(
      <CustomerRewards
        customerId="CUST001"
        monthlyRewards={mockRewards.monthly}
        totalRewards={400}
      />
    );
    const customerElement = screen.getByText(/Customer ID: CUST001/i);
    expect(customerElement).toBeInTheDocument();
  });

  test('displays total rewards correctly', () => {
    render(<CustomerRewards customerId="CUST001" monthlyRewards={mockRewards.monthly}
      totalRewards={200} />);
    const totalRewardsElement = screen.getByText(/Total Rewards: 200 points/i);
    expect(totalRewardsElement).toBeInTheDocument();
  });

  test('displays monthly rewards correctly', () => {
    render(<CustomerRewards customerId="CUST001" monthlyRewards={mockRewards.monthly}
      totalRewards={400} />);
    const rewardsElement = screen.getByText(/Month 4: 100 points/i);
    expect(rewardsElement).toBeInTheDocument();
  });
});
