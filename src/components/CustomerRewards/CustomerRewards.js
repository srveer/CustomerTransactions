import React from 'react';
import styles from './CustomerReward.module.css';
const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('en-US', { month: 'long' });
}

const CustomerRewards = ({ customerId, name, monthlyRewards, totalRewards }) => (
  <>
    <tr>
      <td align='left'>{customerId}</td>
      <td align='left'><b>{name}</b></td>
      <td align='right'>{totalRewards}</td>
    </tr>
    <tr className={styles.spacer}>
      <td></td>
      <td colSpan={2} align='left'>Transaction History</td>
    </tr>
    <tr>
      <th></th>
      <th align='left'>Month</th>
      <th align='right'>Points</th>
    </tr>
    {Object.keys(monthlyRewards).map((month, index) => (
      <tr className={index == Object.keys(monthlyRewards).length - 1 ? styles.bBorder : ""}>
        <td></td>
        <td align='left'>{getMonthName(month)}</td>
        <td align='right'>{monthlyRewards[month]}</td>
      </tr>
    ))}
  </>
);

export default CustomerRewards;