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
                colorPrimary: '#47A992',
                colorBgLayout:'#7A3E3E',
                colorFillSecondary:'#E3F4F4',
                colorFill:'#EEEEEE'
            }
        }}
    >
        <App />
    </ConfigProvider>
);
