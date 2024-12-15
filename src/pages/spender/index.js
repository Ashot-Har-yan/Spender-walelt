import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Button, Input, Select, Typography, Form } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

function Spender() {
  const [car, setCar] = useState(0);
  const [food, setFood] = useState(0);
  const [leisure, setLeisure] = useState(0);
  const [income, setIncome] = useState(0); // Initial income value set to 0
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingIncome, setRemainingIncome] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1); // Default 1 (USD)
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currency !== 'USD') {
      axios
        .get(`https://api.exchangerate-api.com/v4/latest/USD`)
        .then((response) => {
          setExchangeRate(response.data.rates[currency]);
        })
        .catch((error) => console.error('Error fetching exchange rate:', error));
    }
  }, [currency]);

  const handleAddExpense = () => {
    if (!expenseCategory || !expenseAmount || !description) {
      alert('Please fill in all fields');
      return;
    }

    const convertedAmount = expenseAmount * exchangeRate;

    if (expenseCategory === 'Car') {
      setCar((prev) => prev + convertedAmount);
    } else if (expenseCategory === 'Food') {
      setFood((prev) => prev + convertedAmount);
    } else if (expenseCategory === 'Leisure') {
      setLeisure((prev) => prev + convertedAmount);
    }

    setTotalExpenses((prev) => prev + convertedAmount);
    setRemainingIncome(income - totalExpenses - convertedAmount);
    setExpenseAmount(0);
    setDescription('');
  };

  const handleIncomeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setIncome(value);
      setRemainingIncome(value - totalExpenses); // Recalculate remaining income after setting new income
    }
  };

  const handleAddIncome = () => {
    if (income <= 0) {
      alert('Please enter a valid income');
      return;
    }
    setRemainingIncome(income - totalExpenses); // Update remaining income
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: '#001529', padding: 0 }}>
        <div style={{ color: 'white', padding: '16px', textAlign: 'right' }}>
          <Select
            value={currency}
            onChange={setCurrency}
            style={{ width: 120 }}
            dropdownStyle={{ backgroundColor: '#ff225', color: 'white' }}
          >
            <Option value="USD">USD</Option>
            <Option value="EUR">EUR</Option>
            <Option value="GBP">GBP</Option>
            <Option value="INR">INR</Option>
            <Option value="AUD">AUD</Option>
          </Select>
        </div>
      </Layout.Header>

      <Layout.Content style={{ padding: '30px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Car Expenses" bordered={false}>
              <Title level={4}>{car.toFixed(2)} {currency}</Title>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Food Expenses" bordered={false}>
              <Title level={4}>{food.toFixed(2)} {currency}</Title>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Leisure Expenses" bordered={false}>
              <Title level={4}>{leisure.toFixed(2)} {currency}</Title>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Income" bordered={false}>
              <Title level={4}>{income.toFixed(2)} {currency}</Title>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '30px' }}>
          <Col span={24}>
            <Card title="Set Income" bordered={false}>
              <Form layout="inline">
                <Form.Item label="Income">
                  <Input
                    type="number"
                    value={income}
                    onChange={handleIncomeChange} // Update the income state
                    style={{ width: '200px' }}
                    placeholder="Enter your income"
                  />
                </Form.Item>
                <Button type="primary" onClick={handleAddIncome}>
                  Add Income
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '30px' }}>
          <Col span={24}>
            <Card title="Add Expense" bordered={false}>
              <Form layout="inline">
                <Form.Item label="Category">
                  <Select
                    value={expenseCategory}
                    onChange={(value) => setExpenseCategory(value)}
                    style={{ width: '200px' }}
                  >
                    <Option value="Car">Car</Option>
                    <Option value="Food">Food</Option>
                    <Option value="Leisure">Leisure</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Amount">
                  <Input
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(parseFloat(e.target.value))}
                    style={{ width: '200px' }}
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: '200px' }}
                  />
                </Form.Item>
                <Button type="primary" onClick={handleAddExpense}>
                  Add Expense
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '30px' }}>
          <Col span={12}>
            <Card title="Total Expenses" bordered={false}>
              <Title level={4}>{totalExpenses.toFixed(2)} {currency}</Title>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Remaining Income" bordered={false}>
              <Title level={4}>{remainingIncome.toFixed(2)} {currency}</Title>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

export default Spender;
