import { Module } from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { FactoriesEntity } from './factories.entity';
import { FactoryAdapter } from './adapters/factory.adapter';
import { FactoriesController } from './factories.controller';
import { ApplicationExceptionHandler } from '@xpparel/backend-utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoryRepository } from './repository/factory.repository';
import { AppDataSource } from '../app-datasource';
import { AppDataSourceModule } from '../app-datasource.module';

@Module({
  providers: [FactoriesService, ApplicationExceptionHandler,FactoryRepository,FactoryAdapter],
  imports: [
    TypeOrmModule.forFeature([
    FactoriesEntity
  ])],
  controllers: [FactoriesController],
  exports:[FactoriesService]
})
export class FactoriesModule { }
