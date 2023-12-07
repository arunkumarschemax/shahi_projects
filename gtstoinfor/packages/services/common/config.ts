
import * as env from 'dotenv';
export const appConfig = {
    port: {
        port: process.env[`PORT`] ?? 3232
    },
    database: {
        type: process.env[`APP_DB_TYPE`] || 'mysql',
        host: process.env[`APP_DB_HOST`] || '172.20.50.169',
        port: parseInt(process.env[`APP_DB_PORT`]) || 3306,
        username: process.env[`APP_DB_USER`] || 'sampling_app',
        password: process.env[`APP_DB_PASS`] || 'Schemax@sam',
        dbName: process.env[`APP_DB_DBNAME`] || 'sampling',
        poolLimit: parseInt(process.env[`APP_DB_POOL_LIMIT`]) || 50
    },
    
}