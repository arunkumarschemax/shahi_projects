import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter as Router } from 'react-router-dom';
import { RecoilRoot } from "recoil";
import App from './app/app';
import { ConfigProvider, theme } from 'antd';
import { config } from 'packages/libs/shared-services/config';
import { IAMClientProvider } from './app/common/iam-client-react';
import enUS from 'antd/es/calendar/locale/en_US';
import { Locale } from 'antd/es/locale';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const authServerUrl = config.APP_IAM_SERVER_URL;
const clientId = config.APP_IAM_CLIENT_ID;
root.render(
    <RecoilRoot>
        <Router>
            <IAMClientProvider authServerUrl={authServerUrl} clientId={clientId}>
                <ConfigProvider
                locale={(enUS as unknown) as Locale}  
                     theme={{ 
                        algorithm: theme.compactAlgorithm,
                        token: {
                            colorPrimary: '#29397d'
                        }
                    }}
                >
                    <App />
                </ConfigProvider>
            </IAMClientProvider>
        </Router>
    </RecoilRoot>
);