import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
      timezone: 'Z',
      host: '206.189.138.212',
      port: 3306,
      username: "sa_dev_user",
      password: "Schemax@23",
      database: "shahi_tms_vendors",
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