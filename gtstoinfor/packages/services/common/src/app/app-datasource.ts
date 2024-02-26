import { DataSource } from "typeorm"
import { appConfig } from "../../config"
import { DpomEntity } from "./dpom/entites/dpom.entity"
import { BomEntity } from "./po-bom/entittes/bom-entity"
import { PoBomEntity } from "./po-bom/entittes/po-bom.entity"
import { StyleEntity } from "./po-bom/entittes/style-entity"
import Item from "antd/es/list/Item"
import { ItemEntity } from "./po-bom/entittes/item-entity"
import { ZFactorsEntity } from "./po-bom/entittes/z-factors.entity"
import { StyleComboEntity } from "./po-bom/entittes/style-combo-entity"
import { DpomChildEntity } from "./dpom/entites/dpom-child.entity"
import { DpomDifferenceEntity } from "./dpom/entites/dpom-difference.entity"
import { FileUploadEntity } from "./orders/entities/upload-file.entity"

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
  },
})

export const AppDataSource2 = new DataSource({
  type: "mysql",
  timezone: 'Z', 
  host: '159.65.148.229',
  username: 'mkasset_user',
  password: 'asdASD123',
  database: 'nike_copu',
  synchronize: false,
  logging: true,
  extra: {
    connectionLimit: 20
  },
  entities:[StyleEntity,BomEntity,StyleComboEntity,ItemEntity,PoBomEntity,DpomEntity,DpomChildEntity,DpomDifferenceEntity,FileUploadEntity]
})

// export const AppDataSource1 = new DataSource({
//   type: 'oracle',
//   host: '172.16.1.155',
//   port: 1521,
//   username: 'shahiweb',
//   password: 'shahiwebitip1',
//   database: 'shahiweb',
//   synchronize: false,
//   sid: 'reportdb',
//   extra: {
//     validateConnection: true,
//     trustServerCertificate: true,
//   },
// })

// export const AppDataSource2 = new DataSource({
//   type: 'oracle',
//   host: '172.16.1.155',
//   port: 1521,
//   username: 'shahiweb',
//   password: 'shahiwebitip1',
//   database: 'shahiweb-shahi',
//   synchronize: false,
//   sid: 'shahi',
//   extra: {
//     validateConnection: true,
//     trustServerCertificate: true,
//   },
// })