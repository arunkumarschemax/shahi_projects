
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { useState } from 'react';
// import './app.module.css';
// import CustomSpinner from './common/custom-spinner/custom-spinner';
// import { Route, Link } from 'react-router-dom';
// import axios from 'axios';
// import { AppRoutes } from './routes';


// export function App() {
//   const [load, setLoad] = useState<any>();


//   axios.interceptors.request.use(request => {
//       setLoad(true);
//       return request;
//   });

//   axios.interceptors.response.use(response => {
//       setLoad(false);
//       return response;
//   }, error => {
//       setLoad(false);
//       throw error;
//   });

//   return (
//     <>
//       <CustomSpinner loading={load} />
//       <AppRoutes />
//     </>);

// }


// export default App;
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useState } from "react";
import "./app.module.css";
import CustomSpinner from "./common/custom-spinner/custom-spinner";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import { AppRoutes } from "./routes";
import Login from "./layout/login/login";
import { useIAMClientState } from "./common/iam-client-react";

export function App() {
  const [load, setLoad] = useState<any>();
  const { IAMClientAuthContext, dispatch } = useIAMClientState();

  axios.interceptors.request.use((request) => {
    setLoad(true);
    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      setLoad(false);
      return response;
    },
    (error) => {
      setLoad(false);
      throw error;
    }
  );

  return IAMClientAuthContext.isAuthenticated ? (
    <>
      <CustomSpinner loading={load} />
      <AppRoutes />
    </>
  ) : (
    
    <Login />
  );
}

export default App;
