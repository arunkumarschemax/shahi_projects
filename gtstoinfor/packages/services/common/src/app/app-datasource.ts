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

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })