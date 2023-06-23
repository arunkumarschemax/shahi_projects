import { Button, Card, Col, Divider, Form, Input, Row, Typography,message,theme } from 'antd'
import React from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
const { Text, Link, Title } = Typography;
const {useToken} = theme


export default function Login() {
    const [loginForm] = Form.useForm()
    const {token:{colorPrimary,colorPrimaryActive,colorBgTextHover}} = useToken()
    const navigate  = useNavigate();

    const onLogin = () => {
        console.log('login called')
        // loginForm.validateFields().then((values) => {
        //     console.log(values)
        //     const loginDto = new LoginDto(values.username,values.password)
        //     service.login(loginDto).then((res) => {
        //         if(res.status){
        //             localStorage.setItem('auth',JSON.stringify(res.data))
        //             setAuthState([{userName:values.username,isAuthenticated:true,plant:1}]);
        //             message.success(res.internalMessage)
        //             navigate('/')
        //         }else{
        //             message.error(res.internalMessage)
        //         }
        //     })
            
        // })
        navigate('/')
    }
    return (
        <Card style={{background:colorBgTextHover}}>
            <Row gutter={24} justify={'center'}>
                <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',border:`1px solid ${colorPrimaryActive}` }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1  style={{color:colorPrimary }}className='shahi-logo' >SHAHI</h1>
                        <Text style={{ maxWidth: '200px' }} type="secondary">
                            India's Largest exporter of readymade garments, working with the world's biggest brands
                        </Text>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', position: 'absolute', bottom: 0, right: 10 }}>
                        <Text style={{ margin: '0%' }} type='secondary'>Powered by</Text>
                        <Title style={{ margin: '0%' }} level={4}>SchemaX</Title>
                    </div>
                </Col>
                <Divider style={{ height: '90vh' }} type='vertical' />
                <Col span={11} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',background:colorPrimaryActive }} >
                    <div className='login-title'>
                        <Title level={3} style={{color:`#fff`,margin:'0'}}>Log In</Title>
                        <Text style={{color:`#fff`}}>Enter your credentials below to login</Text>
                        <br />
                    </div>
                    <Card style={{ maxWidth: '70%', paddingTop: '10px' }}>
                        <Form  form = {loginForm} layout='vertical'>
                            <Form.Item name='username' label='Username'>
                                <Input />

                            </Form.Item>
                            <Form.Item name='password' label='Password'>
                                <Input.Password />

                            </Form.Item>
                        </Form>
                        <Row justify={'end'}>
                            <Link>Forgot password ?</Link>
                        </Row>
                        <Row style={{ paddingTop: '5px' }}>
                            <Button onClick={onLogin} style={{ width: '100%' }} type={'primary'}>Login</Button>
                        </Row>
                    </Card>
                </Col>

            </Row>
        </Card>
    )
}
