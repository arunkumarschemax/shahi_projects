import { Injectable } from '@nestjs/common';
import { ConnectionOptions } from 'tls';
import { Connection, createConnection, getConnection } from 'typeorm';
import { ManualConnection } from './manual-connection';

@Injectable()
export class AppService {
  constructor(
    private shahiDb : ManualConnection
  ){

  }
  getData(): { message: string } {
    return ({ message: 'Welcome to services/common!' });
  }
  
  async testData() {
    const inaDbConn = await this.shahiDb.getShahiDbConnectionForUnit('1');
    const query = `SELECT LineId, LineName FROM dbo.T_DbInfo where DbName = 'IHS' AND GroupId = ${'1'}`;
    const result: { LineName: string, LineId: number }[] = await inaDbConn.query(query);
  }

}