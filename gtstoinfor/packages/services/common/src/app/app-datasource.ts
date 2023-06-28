import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "172.25.23.4",
    username: "sa",
    password: "manager@123",
    database: "PRS",
    synchronize: false,
    extra: {
        validateConnection: true,
        trustServerCertificate: true,
    },
    options: {
        cryptoCredentialsDetails: {
            minVersion: "TLSv1",
        },
    }
})


// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })

