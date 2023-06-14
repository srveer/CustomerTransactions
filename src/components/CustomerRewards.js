import React from 'react';
import styles from './CustomerReward.module.css';

const CustomerRewards = ({ customerId, monthlyRewards, totalRewards }) => (
  <div className={styles.customerRewards}>
    <h2>Customer ID: {customerId}</h2>
    <div className={styles.monthlyRewards}>
      {Object.keys(monthlyRewards).map((month) => (
        <p key={month}>
          Month {month}: {monthlyRewards[month]} points
        </p>
      ))}
    </div>
    <p className={styles.totalRewards}>Total Rewards: {totalRewards} points</p>
  </div>
);

export default CustomerRewards;