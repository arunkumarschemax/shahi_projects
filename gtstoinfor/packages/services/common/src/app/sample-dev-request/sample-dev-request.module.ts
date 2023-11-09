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

@Module({
  imports: [
  TypeOrmModule.forFeature([
    SampleRequest,
    SampleReqSizeEntity,
    SampleReqFabricinfoEntity,
    SampleRequestTriminfoEntity,
    SampleRequestProcessInfoEntity,
    SamplingbomEntity
  ]),
  ],
  controllers: [SampleDevReqController],
  providers: [SampleRequestService,ApplicationExceptionHandler,SampleRequestRepository,SampleSizeRepo,SampleFabricRepo,SampleTrimRepo,SampleProcessRepo]
})
export class SampleDevReqModule {}