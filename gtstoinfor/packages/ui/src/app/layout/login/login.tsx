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
  notification,
  theme,
} from "antd";
import React from "react";
import "./login.css";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, useIAMClientState } from "../../common/iam-client-react";
import { LoginUserDto } from "../../common/iam-client-react/user-models";
const { Text, Link, Title } = Typography;
const { useToken } = theme;

export default function Login() {
  const [loginForm] = Form.useForm();
  const {
    token: { colorPrimary, colorPrimaryActive, colorBgTextHover },
  } = useToken();
  // const navigate = useNavigate();

  const { IAMClientAuthContext, dispatch } = useIAMClientState();
  // const location = useLocation();
  const onLogin = async (values) => {

    
    try {
      const req = new LoginUserDto(
        values.username,
        values.password,
        IAMClientAuthContext.authServerUrl
      );

      let response = await loginUser(dispatch, req);

      
      if (!response.user) return false;
      // const from = location.state?.from;
      // if (from) {
      //   // navigate(from, { replace: true });
      // } else {
      //   // navigate("/user-management/users-from", { replace: true });
      // }
      return true;
    } catch (error: any) {
      notification.config({ maxCount: 3, duration: 3, placement: "top" });
      notification.destroy();
      notification.error({
        message: "Error",
        description: error.message,
      });
      return false;
    }
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
            <Form form={loginForm} layout="vertical" className="content" onFinish={onLogin}>
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
            <Row justify={"end"}>
              <Link style={{ color: "white" }}>Forgot password ?</Link>
            </Row>
            <Row style={{ paddingTop: "20px", justifyContent: "center" }}>
              <Button
                // onClick={onLogin}
                style={{
                  width: "60%",
                  backgroundColor: "#BBD6EA",
                  color: "black",
                  borderRadius: 5,
                }}
                type={"primary"}
                htmlType="submit"
              >
                Login
              </Button>
            </Row>
            </Form>

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

