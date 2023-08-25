import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
  message,
  theme,
} from "antd";
import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import LogOutComponent from "../../nike/iam-client-react/log-out-component/log-out-component";
import { LoginComponent } from "../../nike/iam-client-react";
const { Text, Link, Title } = Typography;
const { useToken } = theme;

export default function Login() {
  const [loginForm] = Form.useForm();
  const {
    token: { colorPrimary, colorPrimaryActive, colorBgTextHover },
  } = useToken();
  const navigate = useNavigate();

  const onLogin = () => {
    console.log("login called");
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
    navigate("/");
  };
  return (
    <Card className="hero">
      <Row gutter={24} justify={"center"} className="content">
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ color: colorPrimary }} className="shahi-logo">
              SHAHI
            </h1>
            <h2 style={{ color: colorPrimary }} className="pro-name">
              ORDER MANAGEMENT SYSTEM
            </h2>
            {/* <Text style={{ maxWidth: '200px' }} type="secondary">
                        India's Largest exporter of readymade garments, working with the world's biggest brands
                    </Text> */}
          </div>
        </Col>
        <Divider style={{ height: "90vh" }} type="vertical" />
        <Col
          span={11}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              paddingTop: "10px",
              height: "55%",
              width: "55%",
              borderRadius: "10px",
              boxShadow: "1px 1px 5px 5px lightgrey",
              backgroundColor: "#29397d",
            }}
          >
            <div className="login-title">
              <Title level={2} style={{ color: "#ffff", margin: "0" }}>
                Log In
              </Title>
              {/* <Text style={{color:`black`}}>Enter your credentials below to login</Text> */}
              <br />
            </div>

             <LoginComponent/>

            {/* <Form form={loginForm} layout="vertical" className="content">
              <Form.Item
                name="username"
                label={<label style={{ color: "white" }}>Username</label>}
              >
                <Input
                  style={{ borderColor: colorPrimary, borderRadius: 5 }}
                  placeholder="enter your username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label={<label style={{ color: "white" }}>Passowrd</label>}
                style={{ color: "#ffff" }}
              >
                <Input.Password
                  style={{ borderColor: colorPrimary, borderRadius: 5 }}
                  placeholder="enter your password"
                />
              </Form.Item>
            </Form>
            <Row justify={"end"}>
              <Link style={{ color: "white" }}>Forgot password ?</Link>
            </Row>
            <Row style={{ paddingTop: "20px", justifyContent: "center" }}>
              <Button
                onClick={onLogin}
                style={{
                  width: "60%",
                  backgroundColor: "#BBD6EA",
                  color: "black",
                  borderRadius: 5,
                }}
                type={"primary"}
              >
                Login
              </Button>
            </Row> */}
          </Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              position: "absolute",
              bottom: 0,
              right: 10,
            }}
          >
            <Text style={{ margin: "0%" }} type="secondary">
              Powered by
            </Text>
            <Title style={{ margin: "0%" }} level={4}>
              SchemaX
            </Title>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

