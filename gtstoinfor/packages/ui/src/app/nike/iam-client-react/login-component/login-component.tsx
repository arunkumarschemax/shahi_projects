import React from 'react';
import { Form, Input, Button, notification, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './log-in-component.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIAMClientState } from '../iam-client';
import { loginUser } from '../actions';
import { LoginUserDto } from '../user-models';
const { Text } = Typography;


export const LoginComponent = () => {
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (values: any) => {
        try {
            const req = new LoginUserDto(values.username, values.password, IAMClientAuthContext.authServerUrl)
            let response = await loginUser(dispatch, req);
            if (!response.user) return false;
            const from = location.state?.from;
            if (from) {
                navigate(from, { replace: true });
            } else {
                navigate("/nike-dashboard", { replace: true });
            }
            return true;
        } catch (error: any) {
            notification.config({ maxCount: 3, duration: 3, placement: 'top' });
            notification.destroy();
            notification.error(
                {
                    message: 'Error',
                    description: error.message,
                }
            );
            return false;
        }
    };

    return (

        <Card
            className="card-header"
            style={{ height: '55%', width: '300px' }}
        >
            <div><b>NIKE</b></div>
            <br />
            <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
            >
                <Form.Item style={{ width: '250px' }}
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                    ]}
                >
                    <Input width={215} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" autoComplete="off" />
                </Form.Item>

                <Form.Item style={{ width: '250px' }}
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password width={215} prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a style={{ float: 'right' }} href="/">
          Forgot password
        </a>
      </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '250px' }}>
                        Log In
                    </Button>
                    {/* Or <a href="/">register now!</a> */}
                </Form.Item>
            </Form>
        </Card>
    )
}

export default LoginComponent;
