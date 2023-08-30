import { SizeResponseModel } from '@project-management-system/shared-models';
import { AllSizeResponseModel } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { SizeService } from './sizes-service';
import { SizeRequest } from './dto/sizes-request';
import { SizeDto } from './dto/sizes-dto';

@ApiTags('size')
@Controller('size')
export class SizeController{
    constructor(private sizeService: SizeService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

        @Post('/createsize')
        @ApiBody({type: SizeDto})
        async createsize(@Body() sizeDTO:any,isUpdate:boolean=false): Promise<SizeResponseModel> {
        try {
            return await this.sizeService.createSize(sizeDTO, false);
        } catch (error) {
            // return errorHandler(SizeResponseModel,error);
            return this.applicationExceptionHandler.returnException(SizeResponseModel, error);
        }
        }

        @Post('/updateSize')
        @ApiBody({type:SizeDto})
        async updateSize(@Body() sizeDTO: any): Promise<SizeResponseModel> {
          try {
            return await this.sizeService.createSize(sizeDTO, true);
          } catch (error) {
            // return errorHandler(SizeResponseModel, error);
            return this.applicationExceptionHandler.returnException(SizeResponseModel, error);
          }
        }

        @Post('/getAllSize')
        async getAllSize(): Promise<AllSizeResponseModel> {
          try {
            return await this.sizeService.getAllSizes();
          } catch (error) {
            // return errorHandler(AllSizeResponseModel, error);
            return this.applicationExceptionHandler.returnException(AllSizeResponseModel, error);
          }
        }

        @Post('/getAllActiveSize')
  @ApiBody({type:SizeDto})
  async getAllActiveSize(): Promise<AllSizeResponseModel> {
    try {
      return await this.sizeService.getAllActiveSizes();
    } catch (error) {
      // return errorHandler(AllSizeResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllSizeResponseModel, error);
    }
  }

  @Post('/activeteOrDeactivateSize')
  @ApiBody({type:SizeDto})
  async activeteOrDeactivateSize( @Body()request:any ): Promise<AllSizeResponseModel> {
    try {
      return await this.sizeService.activateOrDeactivateSize(request);
    } catch (error) {
      // return errorHandler(AllSizeResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllSizeResponseModel, error);
    }
  }

  @Post('/getActiveSizeById')
  async getActiveSizeById(sizereq: SizeRequest): Promise<AllSizeResponseModel> {
    try {
      return await this.sizeService.getActiveSizeById(sizereq);
    } catch (error) {
      // return errorHandler(AllSizeResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllSizeResponseModel, error);
    }
    
}
}

