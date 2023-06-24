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
                borderRadius: 1
            }
        }}
    >
        <App />
    </ConfigProvider >
);
