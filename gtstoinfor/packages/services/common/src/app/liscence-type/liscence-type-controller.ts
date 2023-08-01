import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';


import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllDeliveryResponseModel, AllLiscenceResponseModel, DeliveryMethodResponseModel, LiscenceTypeResponseModel } from '@project-management-system/shared-models';
import { LiscenceTypeService } from './liscence-type.service';
import { LiscenceTypeDTO } from './dto/liscence-type.dto';
import { LiscenceTypeRequest } from './dto/liscence-type.request';
import { LiscenceType } from './liscence-type.entity';



@ApiTags('liscenc-type')
@Controller('liscenc-type')
export class LiscenceTypeController {
    constructor(private liscenceTypeService: LiscenceTypeService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    @Post('/createLiscenceType')
    @ApiBody({type:LiscenceTypeDTO})
    async createLiscenceType(@Body() liscenceTypeDTO:any,isUpdate:boolean=false): Promise<LiscenceTypeResponseModel> {
    try {
        return await this.liscenceTypeService.createLiscenceType(liscenceTypeDTO, false);
    } catch (error) {
        return this.applicationExceptionHandler.returnException(LiscenceTypeResponseModel, error);
    }
    }
  
    @Post('/updateLiscenceType')
    @ApiBody({type: LiscenceTypeDTO})
    async updateLiscenceType(@Body() liscenceTypeDTO: any): Promise<LiscenceTypeResponseModel> {
      try {
        return await this.liscenceTypeService.createLiscenceType(liscenceTypeDTO, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(LiscenceTypeResponseModel, error);
      }
    }
  @Post('/getAllLiscenceTypes')
  async getAllLiscenceTypes(): Promise<AllLiscenceResponseModel> {
    try {
      return await this.liscenceTypeService.getAllLiscenceTypes();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllLiscenceResponseModel, error);
    }
  }

  @Post('/getAllActiveLiscenceTypes')
  async getAllActiveLiscenceTypes(): Promise<AllLiscenceResponseModel> {
    try {
      return await this.liscenceTypeService.getAllActiveLiscenceTypes();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllLiscenceResponseModel, error);
    }
  }

  @Post('/activateOrDeactivateLiscenceType')
  @ApiBody({type: LiscenceTypeRequest})
  async activateOrDeactivateLiscenceType(@Body() liscenceTypeReq: any): Promise<LiscenceTypeResponseModel> {
    try {
      return await this.liscenceTypeService.activateOrDeactivateLiscenceType(liscenceTypeReq);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(LiscenceTypeResponseModel, error);
    }
  }

  @Post('/getLiscenceTypeById')
  async getLiscenceTypeById(@Body() liscenceTypeReq: LiscenceTypeRequest ): Promise<LiscenceTypeResponseModel> {
      try {
          return await this.liscenceTypeService.getActiveLiscenceTypeById(liscenceTypeReq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(LiscenceTypeResponseModel, err);
      }
  }
}
