import * as env from 'dotenv';
export const appConfig = {
    port: {
        port: process.env[`PORT`] ?? 3232
    },
    database: {
        type: process.env[`APP_DB_TYPE`] || 'mysql',
        host: process.env[`APP_DB_HOST`] || '172.20.50.169',
        port: parseInt(process.env[`APP_DB_PORT`]) || 3306,
        username: process.env[`APP_DB_USER`] || 'doc_scan',
        password: process.env[`APP_DB_PASS`] || 'Schemax@docscan',
        docScandbName: process.env[`APP_DB_DBNAME`] || 'doc_scan',
        poolLimit: parseInt(process.env[`APP_DB_POOL_LIMIT`]) || 50
    },

}