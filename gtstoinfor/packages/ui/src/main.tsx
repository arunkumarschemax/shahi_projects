import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';


import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ConfigProvider
        theme={{
            algorithm: theme.compactAlgorithm,
            token: {
                colorPrimary: '#29397d'
            }
        }}
    >
        <App />
    </ConfigProvider>
);
