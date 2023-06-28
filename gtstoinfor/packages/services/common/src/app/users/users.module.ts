import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { UsersAdaptor } from './adapters/users.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { UsersRepository } from './repository/users.repository';
import { AppDataSourceModule } from '../app-datasource.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ApplicationExceptionHandler,UsersRepository,UsersAdaptor],
  imports: [TypeOrmModule.forFeature([
    UsersEntity,UsersRepository
  ])],
  exports:[UsersService]
})
export class UsersModule { }
