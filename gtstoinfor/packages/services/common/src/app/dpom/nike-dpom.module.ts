import { Module } from '@nestjs/common';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DpomEntity } from './entites/dpom.entity';
import { DpomRepository } from './repositories/dpom.repository';
import { DpomController } from './nike-dpom.controller';
import { DpomService } from './nike-dpom.service';
import { DpomAdapter } from './dto/dpom.adapter';
import { DpomChildRepository } from './repositories/dpom-child.repository';
import { DpomChildEntity } from './entites/dpom-child.entity';
import { DpomDifferenceEntity } from './entites/dpom-difference.entity';
import { DpomChildAdapter } from './dto/dpom-child.adapter';

@Module({
  providers: [DpomService, ApplicationExceptionHandler, DpomRepository, DpomChildRepository, DpomAdapter, DpomChildAdapter],
  imports: [
    TypeOrmModule.forFeature([
      DpomEntity,
      DpomChildEntity,
      DpomDifferenceEntity
    ])],
  controllers: [DpomController],
  exports: [DpomService]
})
export class DpomModule { }
