import { Module } from '@nestjs/common';
import { AdobeAcrobatApiService } from './adobe-acrobat-api.service';
import { AdobeAcrobatApiController } from './adobe-acrobat-api.controller';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@Module({
  controllers: [AdobeAcrobatApiController],
  providers : [ApplicationExceptionHandler,AdobeAcrobatApiService]
})
export class AdobeAcrobatApiModule {}
