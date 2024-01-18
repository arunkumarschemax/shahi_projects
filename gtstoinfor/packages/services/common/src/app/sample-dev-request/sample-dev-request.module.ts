import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleRequest } from './entities/sample-dev-request.entity';
import { SampleDevReqController } from './sample-dev-request.controller';
import { SampleRequestService } from './sample-dev-request.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { SampleReqSizeEntity } from './entities/sample-requset-size-info-entity';
import { SampleReqFabricinfoEntity } from './entities/sample-request-fabric-info-entity';
import { SampleRequestProcessInfoEntity } from './entities/sample-request-process-info-entity';
import { SampleRequestTriminfoEntity } from './entities/sample-request-trim-info-entity';
import { SampleRequestRepository } from './repo/sample-dev-req-repo';
import { SampleSizeRepo } from './repo/sample-dev-size-repo';
import { SampleFabricRepo } from './repo/sample-dev-fabric-repo';
import { SampleTrimRepo } from './repo/sample-dev-trim-repo';
import { SampleProcessRepo } from './repo/sample-dev-process-repo';
import { SamplingbomEntity } from './entities/sampling-bom-entity';
import { SampleInventoryLogEntity } from './entities/sample-inventory-log-entity';
import { SampleInventoryLoqRepo } from './repo/sample-inventory-loe-repo';
import { IndentService, SampleDevelopmentService, WhatsAppNotificationService } from '@project-management-system/shared-services';
import { MaterialAllocationEntity } from './entities/material-allocation.entity';
import { MaterialAllocationRepo } from './repo/material-allocation-repo';
import { MaterialAllocationItemsEntity } from './entities/material-allocation-items';
import { MaterialAllocationItemsRepo } from './repo/material-allocation-items-repo';
import { StocksRepository } from '../stocks/repository/stocks.repository';
import { StocksEntity } from '../stocks/stocks.entity';
import { SampleRequestItemsEntity } from './entities/sample-request-items.entity';
import { UploadFilesRepository } from './repo/upload-files-repository';
import { UploadFilesEntity } from './entities/upload-files-entity';
// import { MaterialAllocationRepo } from './repo/material-allocation-repo';

@Module({
  imports: [
  TypeOrmModule.forFeature([
    SampleRequest,
    SampleReqSizeEntity,
    SampleReqFabricinfoEntity,
    SampleRequestTriminfoEntity,
    SampleRequestProcessInfoEntity,
    SamplingbomEntity,
    SampleInventoryLogEntity,
    MaterialAllocationEntity,
    MaterialAllocationItemsEntity,
    StocksEntity,SampleRequestItemsEntity,UploadFilesEntity

  ]),
  ],
  controllers: [SampleDevReqController],
  providers: [SampleRequestService,ApplicationExceptionHandler,SampleRequestRepository,SampleSizeRepo,SampleFabricRepo,SampleTrimRepo,SampleProcessRepo,SampleInventoryLoqRepo,IndentService,MaterialAllocationRepo,MaterialAllocationItemsRepo,StocksRepository,SampleDevelopmentService,WhatsAppNotificationService,UploadFilesRepository]
})
export class SampleDevReqModule {}