import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';


import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ConfigProvider
        locale={{ locale: 'en-US' }}
        theme={{
            algorithm: theme.compactAlgorithm,
            token: {
                colorPrimary: '#29397d',
                borderRadius: 5,
            }  
        }}
        
        
    >
        <App />
    </ConfigProvider >
);

// import { StrictMode } from 'react';
// import * as ReactDOM from 'react-dom/client';
// import { BrowserRouter, HashRouter as Router } from 'react-router-dom';
// import { RecoilRoot } from "recoil";
// import App from './app/app';
// import { ConfigProvider, theme } from 'antd';
// import { config } from 'packages/libs/shared-services/config';
// import { IAMClientProvider } from './app/common/iam-client-react';

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// const authServerUrl = config.APP_IAM_SERVER_URL;
// const clientId = config.APP_IAM_CLIENT_ID;
// root.render(
//     <RecoilRoot>
//         <Router>
//             <IAMClientProvider authServerUrl={authServerUrl} clientId={clientId}>
//                 <ConfigProvider
//                     theme={{
//                         algorithm: theme.compactAlgorithm,
//                         token: {
//                             colorPrimary: '#29397d'
//                         }
//                     }}
//                 >
//                     <App />
//                 </ConfigProvider>
//             </IAMClientProvider>
//         </Router>
//     </RecoilRoot>
// );