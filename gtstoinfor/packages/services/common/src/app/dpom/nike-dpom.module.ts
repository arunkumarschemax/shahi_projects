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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DpomEntity,
      DpomChildEntity,
      DpomDifferenceEntity,
      NikeFileUploadEntity
    ])],
  controllers: [DpomController],
  providers: [DpomService, ApplicationExceptionHandler, DpomRepository, DpomChildRepository, DpomAdapter, DpomChildAdapter, DpomDifferenceRepository, NikeFileUploadRepository]
})
export class DpomModule { }
