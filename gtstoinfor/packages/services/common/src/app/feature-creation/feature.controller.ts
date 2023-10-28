import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { FeatureService } from './feature.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CommonResponseModel, FeatureDTO, FeatureResponseModel } from '@project-management-system/shared-models';


@ApiTags('feature')
@Controller('feature')
export class FeatureController {
    constructor(private featureService: FeatureService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    @Post('/createFeature')
    @ApiBody({type: FeatureDTO})
    async createFeature(@Body() req:any): Promise<FeatureResponseModel> {
      try {
        return await this.featureService.createFeature(req);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(FeatureResponseModel, error)
      }
    }
    @Post('/getAllFeatures')
   // @ApiBody({type:ItemCreFilterRequest})
    async getAllFeatures(): Promise<CommonResponseModel> {
        try {
            return await this.featureService.getAllFeatures();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
}
