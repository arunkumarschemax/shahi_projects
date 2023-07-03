
import * as env from 'dotenv';
export const appConfig = {
    port: {
        port: process.env[`PORT`] ?? 3232
    },
    database: {
        type: process.env[`APP_DB_TYPE`] || 'mysql',
        host: process.env[`APP_DB_HOST`] || '206.189.138.212',
        port: parseInt(process.env[`APP_DB_PORT`]) || 3306,
        username: process.env[`APP_DB_USER`] || 'sa_dev_user',
        password: process.env[`APP_DB_PASS`] || 'Schemax@23',
        dbName: process.env[`APP_DB_DBNAME`] || 'shahi_orders',
        poolLimit: parseInt(process.env[`APP_DB_POOL_LIMIT`]) || 50
    },
    
}