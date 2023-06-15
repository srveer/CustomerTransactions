import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerRewards from '../CustomerRewards';

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
        name="John doe"
        monthlyRewards={mockRewards.monthly}
        totalRewards={400}
      />
    );
    const customerElement = screen.getByText(/CUST001/i);
    expect(customerElement).toBeInTheDocument();
  });

  test('displays total rewards correctly', () => {
    render(<CustomerRewards customerId="CUST001" monthlyRewards={mockRewards.monthly}
      totalRewards={200} />);
    const totalRewardsElement = screen.getByText(/200/i);
    expect(totalRewardsElement).toBeInTheDocument();
  });

  test('displays monthly rewards correctly', () => {
    render(<CustomerRewards customerId="CUST001" monthlyRewards={mockRewards.monthly}
      totalRewards={400} />);
    const rewardsElement = screen.getByText(/100/i);
    expect(rewardsElement).toBeInTheDocument();
  });
});
