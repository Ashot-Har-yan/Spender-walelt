// src/App.js
import React, { useState } from 'react';
import { Input, Button, Typography, Card, List } from 'antd';
// import 'antd/dist/antd.css';
import ExpenseCategory from './expense';

const { Title } = Typography;

const Spender = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [incomeInput, setIncomeInput] = useState(''); // Temporary state for income input

  // Function to add the income
  const addIncome = () => {
    if (incomeInput !== '') {
      setIncome(parseFloat(incomeInput));
      setIncomeInput(''); // Clear the income input field after adding income
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

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Spender App</Title>

      {/* Add Income */}
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

      {/* Expense Categories */}
      <ExpenseCategory category="Car" onAddExpense={addExpense} />
      <ExpenseCategory category="Food" onAddExpense={addExpense} />
      <ExpenseCategory category="Leisure" onAddExpense={addExpense} />
      <ExpenseCategory category="Others" onAddExpense={addExpense} />

      {/* Total Expense and Remaining Income */}
      <Card style={{ marginBottom: 20 }}>
        <Title level={4}>Total Expense: ${totalExpenses.toFixed(2)}</Title>
        <Title level={4}>Remaining Income: ${remainingIncome.toFixed(2)}</Title>
      </Card>

      {/* Expense List */}
      <Card title="Expense List">
        <List
          bordered
          dataSource={expenses}
          renderItem={(expense, index) => (
            <List.Item key={index}>
              <strong>{expense.category}</strong>: ${expense.amount} - {expense.description}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Spender;
