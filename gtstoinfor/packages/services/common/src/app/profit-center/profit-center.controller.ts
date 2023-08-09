import {ProfitCenterResponseModel} from '@project-management-system/shared-models'
import { AllProfitCenterResponseModel } from '@project-management-system/shared-models'
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { ProfitCenterDTO } from './dto/profit-center.dto';
import { ProfitCenterService } from './profit-center.service';
import { ProfitCenterRequest } from './dto/profit-center-request';

@ApiTags('profit-center')
@Controller('profitcenter')
export class ProfitCenterController{
    constructor(private profiteCenterservice: ProfitCenterService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

        @Post('/createProfitCenter')
        async createProfitCenter(@Body() profiteCenterDTO:ProfitCenterDTO,isUpdate:boolean=false): Promise<ProfitCenterResponseModel> {
        try {
            return await this.profiteCenterservice.createProfitCenter(profiteCenterDTO, false);
        } catch (error) {
            // return errorHandler(ProfitCenterResponseModel,error);
            return this.applicationExceptionHandler.returnException(ProfitCenterResponseModel, error);
        }
        }

        @Post('/updateProfitCenter')
        @ApiBody({type:ProfitCenterDTO})
        async updateProfitCenter(@Body() profitCenterDTO: any): Promise<ProfitCenterResponseModel> {
          try {
            return await this.profiteCenterservice.createProfitCenter(profitCenterDTO, true);
          } catch (error) {
            // return errorHandler(ProfitCenterResponseModel, error);
            return this.applicationExceptionHandler.returnException(ProfitCenterResponseModel, error);
          }
        }

        @Post('/getAllProfitCenter')
        async getAllProfitCenter(): Promise<AllProfitCenterResponseModel> {
          try {
            return await this.profiteCenterservice.getAllProfitCenter();
          } catch (error) {
            // return errorHandler(AllProfitCenterResponseModel, error);
            return this.applicationExceptionHandler.returnException(AllProfitCenterResponseModel, error);
          }
        }

        @Post('/getAllActiveProfitCenter')
  @ApiBody({type:ProfitCenterDTO})
  async getAllActiveProfitCenter(): Promise<AllProfitCenterResponseModel> {
    try {
      return await this.profiteCenterservice.getAllActiveProfitCenter();
    } catch (error) {
      // return errorHandler(AllProfitCenterResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllProfitCenterResponseModel, error);
    }
  }

  @Post('/activeteOrDeactivateProfitCenter')
  @ApiBody({type:ProfitCenterDTO})
  async activeteOrDeactivateProfitCenter( @Body()request:any ): Promise<AllProfitCenterResponseModel> {
    try {
      return await this.profiteCenterservice.activateOrDeactivateProfitCenter(request);
    } catch (error) {
      // return errorHandler(AllProfitCenterResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllProfitCenterResponseModel, error);
    }
  }

  @Post('/getActiveProfitCenterById')
  async getActiveProfitCenterById(profitreq: ProfitCenterRequest): Promise<AllProfitCenterResponseModel> {
    try {
      return await this.profiteCenterservice.getActiveProfitCenterById(profitreq);
    } catch (error) {
      // return errorHandler(AllProfitCenterResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllProfitCenterResponseModel, error);
    }
    
}
}

