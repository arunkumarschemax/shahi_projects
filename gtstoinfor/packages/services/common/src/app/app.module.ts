import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoriesController } from './factories/factories.controller';
import { FactoriesModule } from './factories/factories.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import windowsDriver = require('mssql/msnodesqlv8');


@Module({
  imports: [
   
  FactoriesModule,
   
  UsersModule],
  controllers: [AppController, FactoriesController],
  providers: [AppService, UsersService],
})
export class AppModule {}
