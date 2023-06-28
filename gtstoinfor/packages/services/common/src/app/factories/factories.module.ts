import { Module } from '@nestjs/common';
import { FactoriesService } from './factories.service';
import { FactoriesEntity } from './factories.entity';
import { FactoryAdapter } from './adapters/factory.adapter';
import { FactoriesController } from './factories.controller';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoryRepository } from './repository/factory.repository';
import { AppDataSource } from '../app-datasource';
import { AppDataSourceModule } from '../app-datasource.module';

@Module({
  providers: [FactoriesService, ApplicationExceptionHandler,FactoryRepository],
  imports: [AppDataSourceModule,FactoryAdapter, TypeOrmModule.forFeature([
    FactoriesEntity
  ])],
  controllers: [FactoriesController],
})
export class FactoriesModule { }
