import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: 'mssql',
    host: '172.25.23.4',
    username: 'sa',
    password: 'manager@123',
    database: 'SEPLScanDB',
    synchronize: false,
    extra: {
        trustServerCertificate: true,
      }
})


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

