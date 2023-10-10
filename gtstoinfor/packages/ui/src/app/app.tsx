import { useState } from 'react';
import bgImage from '../assets/images/boi-logo.jpg';
import { AxiosInstance } from '@xpparel/shared-services';
import { useIAMClientState, LoginComponent } from './common';
import { CustomSpinner } from './common/custom-spinner/custom-spinner';
import { BasicLayout } from './layout/basic-layout/layout';
import './app.css';

function App() {
  const { IAMClientAuthContext } = useIAMClientState();
  let counter = 0;
  const [load, setLoad] = useState(false);


  AxiosInstance.interceptors.request.use(request => {
    counter++;
    if (!request['loadStatus']) {
      setLoad(true);
    }
    return request;
  });

  AxiosInstance.interceptors.response.use(response => {
    counter--;
    if (counter == 0) {
      setLoad(false);
    }
    return response;
  }, error => {
    counter--;
    if (counter == 0)
      setLoad(false);
    throw error;
  })

  return (IAMClientAuthContext.isAuthenticated ? <>
    <CustomSpinner loading={load} />
    <div className="App">
      <BasicLayout key="1" />
    </div>
  </> :
    <div style={{
      backgroundColor: 'white',
     // backgroundImage: `url(${bgImage})`,
      backgroundSize: 'contain', // Image will be contained within the background
      backgroundRepeat: 'no-repeat', // Prevent image repetition
      backgroundPosition: 'center', // Center the image horizontally and vertically
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <LoginComponent />
    </div>
  );
}

export default App;
