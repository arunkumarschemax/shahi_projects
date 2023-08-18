import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app/app';
import { config } from 'packages/libs/shared-services/config';
import { IAMClientProvider } from './app/common/iam-client-react';

const authServerUrl = config.APP_IAM_SERVER_URL;
const clientId = config.APP_IAM_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <HashRouter>
        <IAMClientProvider authServerUrl={authServerUrl} clientId={clientId}>
            <App />
        </IAMClientProvider>
    </HashRouter>
);
