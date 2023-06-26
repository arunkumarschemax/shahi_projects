import { SqlServerConnectionOptions } from "typeorm/driver/sqlserver/SqlServerConnectionOptions";

const config: SqlServerConnectionOptions = {
    type: 'mssql',
    host: '172.25.23.4',
    username: 'sa',
    password: 'manager@123',
    database: 'SEPLScanDB',
    synchronize: false,
    extra: {
        trustServerCertificate: true,
        validateConnection: false,
        options: {
          instanceName: "SQLEXPRESS",
          fallbackToDefaultDb: true 
        },
      },
  };
  
  export default config;