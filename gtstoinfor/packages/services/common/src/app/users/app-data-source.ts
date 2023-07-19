
import { appConfig } from "packages/services/common/config";
import { DataSource } from "typeorm";
import { UsersEntity } from "./users.entity";

export const OrderDataSource = new DataSource({
    type: "mysql",
    host: appConfig.database.host,
    port: appConfig.database.port,
    username: appConfig.database.username,
    password: appConfig.database.password,
    database: appConfig.database.dbName,
    entities: [UsersEntity
    ],
})

OrderDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })