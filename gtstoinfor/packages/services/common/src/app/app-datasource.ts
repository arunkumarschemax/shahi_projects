import { DataSource } from "typeorm"
import { appConfig } from "../../config"

export const AppDataSource = new DataSource({
  type: "mysql",
  timezone: 'Z',
  host: appConfig.database.host,
  port: appConfig.database.port,
  username: appConfig.database.username,
  password: appConfig.database.password,
  database: appConfig.database.dbName,
  synchronize: false,
  logging: true,
  extra: {
    connectionLimit: 20
  }
})

export const AppDataSource1 = new DataSource({
  type: 'oracle',
  host: '172.16.1.155',
  port: 1521,
  username: 'shahiweb',
  password: 'shahiwebitip1',
  database: 'shahiweb',
  synchronize: false,
  sid: 'reportdb',
  extra: {
    validateConnection: true,
    trustServerCertificate: true,
  },
})

export const AppDataSource2 = new DataSource({
  type: 'oracle',
  host: '172.16.1.155',
  port: 1521,
  username: 'shahiweb',
  password: 'shahiwebitip1',
  database: 'shahiweb-shahi',
  synchronize: false,
  sid: 'shahi',
  extra: {
    validateConnection: true,
    trustServerCertificate: true,
  },
})