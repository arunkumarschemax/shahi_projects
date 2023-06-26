import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import windowsDriver = require('mssql/msnodesqlv8');
import { ManualConnection } from './manual-connection';


@Module({
  imports: [
   
  ],
  controllers: [AppController],
  providers: [AppService,ManualConnection],
})
export class AppModule {}
