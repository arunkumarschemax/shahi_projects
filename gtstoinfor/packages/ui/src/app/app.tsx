
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Form, Typography, message } from 'antd';
import axios from "axios";
import { useState } from "react";
import backgrod from './backgrod.jpg';
import bkimage from './newloginpage.jpeg';
// import 'antd/dist/antd.css';
import './app.css';
import './app.module.css';

import { LoginComponent, useIAMClientState } from "./common";
import CustomSpinner from "./common/custom-spinner/custom-spinner";
const { Text } = Typography;



export function App() {

  const { IAMClientAuthContext, dispatch } = useIAMClientState();
  const [load, setLoad] = useState(false);
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : undefined



  const [form] = Form.useForm();
  //setting load attribute for every request
  axios.interceptors.request.use(request => {
    setLoad(true);
    return request;
  });
  //setting loading flag false after getting response for every request
  axios.interceptors.response.use(response => {
    setLoad(false);
    return response;
  }, error => {
    setLoad(false);
    throw error;
  });

  const handleSubmit = (values: any) => {
    if (values.username && values.password) {
      localStorage.setItem("user", JSON.stringify(values.username));
      setLoad(false);
    } else {
      message.error('Enter Username and password')
    }
  }


  return (
    <div style={{ backgroundImage: `url(${backgrod})`, display: 'flex', backgroundSize: 'cover', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoginComponent />
    </div>
  );
};



export default App;
