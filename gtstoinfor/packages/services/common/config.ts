
import * as env from 'dotenv';
const https = require('https');
export const appConfig = {
    port: {
        port: process.env[`PORT`] ?? 3232
    },
    database: {
        type: process.env[`APP_DB_TYPE`] || 'mysql',
        host: process.env[`APP_DB_HOST`] || '165.22.220.143',
        port: parseInt(process.env[`APP_DB_PORT`]) || 3306,
        username: process.env[`APP_DB_USER`] || 'ramakrishna',
        password: process.env[`APP_DB_PASS`] || 'Schemax@23',
        dbName: process.env[`APP_DB_DBNAME`] || 'uniqlo12',
        poolLimit: parseInt(process.env[`APP_DB_POOL_LIMIT`]) || 50
    },
    m3Cred: {
        USER_NAME: 'query',
        PASSWORD: 'query123',
        headerRequest: () => {
            const auth = 'Basic ' + Buffer.from(`${appConfig.m3Cred.USER_NAME}:${appConfig.m3Cred.PASSWORD}`).toString('base64');
            const headersRequest = {
                Authorization: `${auth}`,
            };
            const agent = new https.Agent({
                rejectUnauthorized: false,
            });
            return { headersRequest, agent }
        }
    }


}