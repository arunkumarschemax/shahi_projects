import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';


import App from './app/app';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RecoilRoot>
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
    </RecoilRoot>
);
