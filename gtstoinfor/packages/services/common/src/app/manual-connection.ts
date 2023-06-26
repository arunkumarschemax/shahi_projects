import { Connection, ConnectionOptions, createConnection, getConnection } from "typeorm";

export class ManualConnection {
    constructor(){

    }
    async getShahiDbConnectionForUnit(lineId: string): Promise<Connection> {
        const connectionString: ConnectionOptions = {
            type: 'mssql',
            host: '172.25.23.4',
            username: 'sa',
            password: 'manager@123',
            database: 'SEPLScanDB',
            synchronize: false,
            name: 'SHAHI-'+lineId,
            extra: {
                validateConnection: true,
                trustServerCertificate: true,
            },
            options: {
                cryptoCredentialsDetails: {
                  minVersion: "TLSv1",
                },
            }
        }
        let connection;
        try {
            connection = getConnection('SHAHI-'+lineId);
            if (!connection?.isConnected) {
                throw null;
            }
            console.log('SHAHI CONNECTION STARTED',connection?.isConnected)
        } catch (error) {
            connection = await createConnection(connectionString);
            console.log('SHAHI CONNECTION STARTED',connection?.isConnected)
        }
        return connection;
    }
}