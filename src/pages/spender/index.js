import React, { useState } from 'react';
import { Input, Button, Typography, Card, List, Select } from 'antd';
import ExpenseCategory from './expense';

const { Title } = Typography;
const { Option } = Select;

const Spender = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [incomeInput, setIncomeInput] = useState('');
  const [currency, setCurrency] = useState('USD'); // State for selected currency
  
  const addIncome = () => {
    if (incomeInput !== '') {
      setIncome(parseFloat(incomeInput));
      setIncomeInput('');
    }
  };

  const addExpense = (category, amount, description) => {
    setExpenses([
      ...expenses,
      { category, amount, description }
    ]);
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingIncome = income - totalExpenses;

  const handleCurrencyChange = (value) => {
    setCurrency(value); // Update currency state when changed
  };

  // Currency symbols based on the selected currency
  const getCurrencySymbol = (currencyCode) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹',
      JPY: '¥'
    };
    return symbols[currencyCode] || '$'; // Default to USD if not found
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Spender App</Title>

      <Card style={{ marginBottom: 20 }}>
        <Title level={4}>Enter Your Income</Title>
        <Input
          type="number"
          placeholder="Add your income amount"
          value={incomeInput}
          onChange={(e) => setIncomeInput(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Button type="primary" onClick={addIncome}>
          Add Income
        </Button>
      </Card>

      <ExpenseCategory category="Car" onAddExpense={addExpense} />
      <ExpenseCategory category="Food" onAddExpense={addExpense} />
      <ExpenseCategory category="Leisure" onAddExpense={addExpense} />
      <ExpenseCategory category="Others" onAddExpense={addExpense} />

      <Card style={{ marginBottom: 20 }}>
        <Title level={4}>Total Expense: {getCurrencySymbol(currency)}{totalExpenses.toFixed(2)}</Title>
        <Title level={4}>Remaining Income: {getCurrencySymbol(currency)}{remainingIncome.toFixed(2)}</Title>
      </Card>

      <Card title="Expense List">
        <List
          bordered
          dataSource={expenses}
          renderItem={(expense, index) => (
            <List.Item key={index}>
              <strong>{expense.category}</strong>: {getCurrencySymbol(currency)}{expense.amount} - {expense.description}
            </List.Item>
          )}
        />
      </Card>

      <Card style={{ marginTop: 20 }}>
        <Title level={4}>Select Currency</Title>
        <Select defaultValue={currency} onChange={handleCurrencyChange} style={{ width: 120 }}>
          <Option value="USD">USD</Option>
          <Option value="EUR">EUR</Option>
          <Option value="GBP">GBP</Option>
          <Option value="INR">INR</Option>
          <Option value="JPY">JPY</Option>
        </Select>
      </Card>
    </div>
  );
};

export default Spender;
