import React, { useEffect, useState } from 'react';
import transactions from '../../data/transactions';
import CustomerRewards from '../CustomerRewards/CustomerRewards';
import styles from './RewardPointsCalculator.module.css';
const RewardPointsCalculator = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch transaction data
    const fetchTransactions = () => {
      setTimeout(() => {
        setTransactionData(transactions);
      }, 1000); // Simulate 1 second delay
    };

    fetchTransactions();
  }, []);

  const calculatePoints = (amount) => {
    if (amount > 100) {
      return (amount - 100) * 2 + 50;
    } else if (amount > 50) {
      return amount - 50;
    } else {
      return 0;
    }
  };

  const getMonthFromDate = (date) => {
    const [year, month, day] = date.split('-');
    return parseInt(month);
  };

  const calculateRewards = (transactions) => {
    const rewardsByCustomer = {};

    transactions.forEach((transaction) => {
      const { customerId, name, amount, date } = transaction;
      const month = getMonthFromDate(date);
      const points = calculatePoints(amount);

      if (!rewardsByCustomer[customerId]) {
        rewardsByCustomer[customerId] = {
          total: 0,
          monthly: {},
        };
      }

      if (!rewardsByCustomer[customerId].monthly[month]) {
        rewardsByCustomer[customerId].monthly[month] = 0;
      }
      rewardsByCustomer[customerId].name = name;
      rewardsByCustomer[customerId].total += points;
      rewardsByCustomer[customerId].monthly[month] += points;
    });

    return rewardsByCustomer;
  };

  const rewardsByCustomer = calculateRewards(transactionData);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reward Points Calculator</h1>
      {transactionData.length > 0 ? (
        <div>
          <table className={styles.styledTable}>
            <thead>
              <tr>
                <th align='left'>ID</th>
                <th align='left'>Name</th>
                <th align='right'>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(rewardsByCustomer).map((customerId) => (
                <CustomerRewards
                  key={customerId}
                  name={rewardsByCustomer[customerId].name}
                  customerId={customerId}
                  monthlyRewards={rewardsByCustomer[customerId].monthly}
                  totalRewards={rewardsByCustomer[customerId].total}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading transaction data...</p>
      )}
    </div>
  );
};

export default RewardPointsCalculator;
