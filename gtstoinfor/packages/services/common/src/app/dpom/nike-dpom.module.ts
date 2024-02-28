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
import { DpomDifferenceRepository } from './repositories/dpom-difference.repository';
import { NikeFileUploadEntity } from './entites/upload-file.entity';
import { NikeFileUploadRepository } from './repositories/upload.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { PDFFileInfoEntity } from './entites/pdf-file-info.entity';
import { COLineEntity } from './entites/co-line.entity';
import { COLineRepository } from './repositories/co-line.repository';
import { AddressService } from '../address/address.service';
import { AddressRepository } from '../address/address.repo';
import { AddressEntity } from '../address/address.entity';
import { DivertEntity } from './entites/divert.entity';
import { DivertRepository } from './repositories/divert.repository';
import { PoBomEntity } from '../po-bom/entittes/po-bom.entity';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      DpomEntity,
      DpomChildEntity,
      DpomDifferenceEntity,
      NikeFileUploadEntity,
      PDFFileInfoEntity,
      COLineEntity,
      AddressEntity,
      DivertEntity,
      PoBomEntity
    ])],
  controllers: [DpomController],
  providers: [DpomService, AddressService, AddressRepository, ApplicationExceptionHandler, DpomRepository, DpomChildRepository, DpomAdapter, DpomChildAdapter, DpomDifferenceRepository, NikeFileUploadRepository, COLineRepository, DivertRepository]
})
export class DpomModule { }
