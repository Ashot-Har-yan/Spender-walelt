import {  useState } from 'react';
import { Form, Input, Button,Flex, notification } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { ROUTE_CONSTANTS } from '../../../util/constants';
import AuthWrapper from '../../../sheard/AuthWrapper';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserProfileInfo } from '../../../state/userProfile';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [ form] = Form.useForm();

  const handleLogin = async values => {
    setLoading(true);
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      form.resetFields();
      dispatch(fetchUserProfileInfo())

    }catch (error) {
      notification.error({
        message: 'Invalid Login Credentials',
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <AuthWrapper title="Sign in">
      <Form layout="vertical" form={form} onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            }
          ]}
        >
          <Input type="email" placeholder="Email"/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password placeholder="Password"/>
        </Form.Item>
        <Flex align="center" gap="20px" justify='space-around' >

        <Button type="primary" htmlType="submit" loading={loading}>
          Sign in
        </Button>
        <Button type='primary' htmlType="submit">
        <Link to={ROUTE_CONSTANTS.REGISTER}>Create account</Link>
        </Button>
          </Flex>
       
      </Form>
    </AuthWrapper>
  )
}


export default Login;