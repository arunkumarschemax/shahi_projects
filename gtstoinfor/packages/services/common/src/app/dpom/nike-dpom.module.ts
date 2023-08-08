import { Module } from '@nestjs/common';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DpomEntity } from './entites/dpom.entity';
import { DpomRepository } from './repositories/dpom.repository';
import { DpomController } from './nike-dpom.controller';
import { DpomService } from './nike-dpom.service';
import { DpomAdapter } from './dto/dpom.adapter';

@Module({
  providers: [DpomService, ApplicationExceptionHandler, DpomRepository, DpomAdapter],
  imports: [
    TypeOrmModule.forFeature([
      DpomEntity
    ])],
  controllers: [DpomController],
  exports: [DpomService]
})
export class DpomModule { }
