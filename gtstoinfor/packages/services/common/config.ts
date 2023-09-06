
import * as env from 'dotenv';
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
        dbName: process.env[`APP_DB_DBNAME`] || 'shahi_nike',
        poolLimit: parseInt(process.env[`APP_DB_POOL_LIMIT`]) || 50
    },
    adobeAcrobatApiCred : {
        client_credentials: {
         client_id: "976ac685c80d451e95bf497a3a98147c",
         client_secret: "p8e-kipsaocMEwglTRGTOggrHtBKBgDK_sSD"
        },
        service_principal_credentials: {
         organization_id: "618B1DCD64E8CE330A495C2D@AdobeOrg"
        }
       }

}