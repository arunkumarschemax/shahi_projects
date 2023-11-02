import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { FeatureService } from './feature.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CommonResponseModel, FeatureDTO, FeatureFilterRequest, FeatureResponseModel } from '@project-management-system/shared-models';


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
    @ApiBody({type:FeatureFilterRequest})
    async getAllFeatures(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return await this.featureService.getAllFeatures(req);
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
    @Post('/getFeatureCode')
    async getFeatureCode(): Promise<CommonResponseModel> {
        try {
            return await this.featureService.getFeatureCode();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
    @Post('/getFeatureName')
    async getFeatureName(): Promise<CommonResponseModel> {
        try {
            return await this.featureService.getFeatureName();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
    @Post('/getOptionGropup')
    async getOptionGropup(): Promise<CommonResponseModel> {
        try {
            return await this.featureService.getOptionGropup();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getFeaturesInfo')
    async getFeaturesInfo(): Promise<CommonResponseModel> {
        try {
            return await this.featureService.getFeaturesInfo();
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
}
