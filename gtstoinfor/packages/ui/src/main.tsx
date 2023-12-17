import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app/app';
import { config } from 'packages/libs/shared-services/config';
import { IAMClientProvider } from './app/nike/iam-client-react';
import { ConfigProvider, theme } from 'antd';

const authServerUrl = config.APP_IAM_SERVER_URL;
const clientId = config.APP_IAM_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(

    <ConfigProvider
        theme={{
            algorithm: theme.compactAlgorithm,
            token: {
                colorPrimary: '#29397d'
            },
            // components: {
            //     Table: {
            //         lineHeight: 5,
            //     }
            // }
        }}
    >
        <HashRouter>
            <IAMClientProvider authServerUrl={authServerUrl} clientId={clientId}>
                <App />
            </IAMClientProvider>
        </HashRouter>
    </ConfigProvider>

);