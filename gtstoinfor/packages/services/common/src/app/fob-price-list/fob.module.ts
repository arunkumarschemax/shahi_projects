import { Module } from '@nestjs/common';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../app-datasource';
import { AppDataSourceModule } from '../app-datasource.module';
import { FobService } from './fob.service';
import { FobRepository } from './repository/fob.repository';
import { FobAdapter } from './adapters/fob.adapter';
import { FobEntity } from './fob.entity';
import { FobController } from './fob.controller';

@Module({
  providers: [FobService, ApplicationExceptionHandler,FobRepository,FobAdapter],
  imports: [
    TypeOrmModule.forFeature([
        FobEntity
  ])],
  controllers: [FobController],
  exports:[FobService]
})
export class FobModule { }
