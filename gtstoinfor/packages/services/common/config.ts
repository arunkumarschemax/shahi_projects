
import * as env from 'dotenv';
export const appConfig = {
    port: {
        port: process.env[`PORT`] ?? 3232
    },
    // database: {
    //     type: process.env[`APP_DB_TYPE`] || 'mysql',
    //     host: process.env[`APP_DB_HOST`] || '165.22.220.143',
    //     port: parseInt(process.env[`APP_DB_PORT`]) || 3306,
    //     username: process.env[`APP_DB_USER`] || 'ramakrishna',
    //     password: process.env[`APP_DB_PASS`] || 'Schemax@23',
    //     dbName: process.env[`APP_DB_DBNAME`] || 'shahi_crm',
    //     poolLimit: parseInt(process.env[`APP_DB_POOL_LIMIT`]) || 50
    // },
    database: {
        type: process.env[`APP_DB_TYPE`] || 'mysql',
        host: process.env[`APP_DB_HOST`] || 'localhost',
        port: parseInt(process.env[`APP_DB_PORT`]) || 3306,
        username: process.env[`APP_DB_USER`] || 'root',
        password: process.env[`APP_DB_PASS`] || 'your_current_password',
        dbName: process.env[`APP_DB_DBNAME`] || 'crm_new1',
        poolLimit: parseInt(process.env[`APP_DB_POOL_LIMIT`]) || 50
    },
    
    
}