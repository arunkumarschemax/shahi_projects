
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import './app.module.css';
import CustomSpinner from './common/custom-spinner/custom-spinner';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import { AppRoutes } from './routes';
import { LoginComponent, useIAMClientState } from './iam-client-react';
import { AppRoutesNew } from './route-new';


export function App() {
  const [load, setLoad] = useState<any>();
  const { IAMClientAuthContext, dispatch } = useIAMClientState();

  axios.interceptors.request.use(request => {
      setLoad(true);
      return request;
  });

  axios.interceptors.response.use(response => {
      setLoad(false);
      return response;
  }, error => {
      setLoad(false);
      throw error;
  });

  return (
    IAMClientAuthContext.isAuthenticated ? <>
    <CustomSpinner loading={load} />
    <AppRoutesNew />
  </> :
    <div style={{ backgroundColor:'rgba(0, 0, 0, 0.45)', display: 'flex', backgroundSize: 'cover', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoginComponent />
    </div>
  );

}


export default App;
