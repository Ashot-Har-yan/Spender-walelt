// src/ExpenseCategory.js
import React, { useState } from 'react';
import { Input, Button, Card, Typography } from 'antd';

const { Title } = Typography;

const ExpenseCategory = ({ category, onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (amount && description) {
      onAddExpense(category, parseFloat(amount), description);
      setAmount('');
      setDescription('');
    }
  };

  return (
    <Card style={{ marginBottom: 20 }}>
      <Title level={4}>{category}</Title>
      <Input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Button type="primary" onClick={handleAdd}>Add Expense</Button>
    </Card>
  );
};

export default ExpenseCategory;
