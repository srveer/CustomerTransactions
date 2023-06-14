import React from 'react';
import { render, screen } from '@testing-library/react';
import RewardPointsCalculator from './RewardPointsCalculator';
import { act } from "react-dom/test-utils";


beforeEach(() => {
  jest.useFakeTimers();
});

describe('RewardPointsCalculator', () => {
  test('renders component correctly', () => {
    render(<RewardPointsCalculator />);
    const headingElement = screen.getByText(/Reward Points Calculator/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('displays loading message when transaction data is not available', () => {
    render(<RewardPointsCalculator />);
    const loadingElement = screen.getByText(/Loading transaction data.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  test('calculates and displays rewards for each customer', async () => {
    await render(<RewardPointsCalculator />);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    const customerElement1 = screen.getByText(/Customer ID: CUST001/i);
    expect(customerElement1).toBeInTheDocument();

    const totalRewardsElement1 = screen.getByText(/Total Rewards: 390 points/i);
    expect(totalRewardsElement1).toBeInTheDocument();

    const customerElement2 = screen.getByText(/Customer ID: CUST002/i);
    expect(customerElement2).toBeInTheDocument();

    const totalRewardsElement2 = screen.getByText(/Total Rewards: 55 points/i);
    expect(totalRewardsElement2).toBeInTheDocument();
  });
});
