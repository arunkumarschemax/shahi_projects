import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleRequest } from './sample-dev-request.entity';
import { SampleDevReqController } from './sample-dev-request.controller';
import { SampleDevReqService } from './sample-dev-request.service';
import { SampleDevAdapter } from './dto/sample-dev-request.adapter';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  imports: [
  TypeOrmModule.forFeature([SampleRequest]),
  ],
  controllers: [SampleDevReqController],
  providers: [SampleDevReqService,SampleDevAdapter,ApplicationExceptionHandler]
})
export class SampleDevReqModule {}