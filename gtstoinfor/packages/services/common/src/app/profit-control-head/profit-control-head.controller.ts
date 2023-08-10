import { ProfitControlHeadResponseModel } from '@project-management-system/shared-models';
import { AllProfitControlHeadResponseModel } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { ProfitControlHeadDTO } from './dto/profit-control-head.dto';
import { ProfitControlHeadService } from './profit-control-head.service';
import { ProfitControlHeadRequest } from './dto/profit-control-head-request';

@ApiTags('profit-control-head')
@Controller('profitcontrolhead')
export class ProfitControlHeadController{
    constructor(private profitControlHeadService: ProfitControlHeadService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

        @Post('/createProfitControlHead')
        async createProfitControlHead(@Body() profitControlheadDTO:ProfitControlHeadDTO,isUpdate:boolean=false): Promise<ProfitControlHeadResponseModel> {
        try {
            return await this.profitControlHeadService.createProfitControlHead(profitControlheadDTO, false);
        } catch (error) {
            // return errorHandler(ProfitControlHeadResponseModel,error);
            return this.applicationExceptionHandler.returnException(ProfitControlHeadResponseModel, error);
        }
        }

        @Post('/updateProfitContralHead')
        @ApiBody({type:ProfitControlHeadDTO})
        async updateProfitContralHead(@Body() profitControlheadDTO: any): Promise<ProfitControlHeadResponseModel> {
          try {
            return await this.profitControlHeadService.createProfitControlHead(profitControlheadDTO, true);
          } catch (error) {
            // return errorHandler(ProfitControlHeadResponseModel, error);
            return this.applicationExceptionHandler.returnException(ProfitControlHeadResponseModel, error);
          }
        }

        @Post('/getAllProfitControlHead')
        async getAllProfitControlHead(): Promise<AllProfitControlHeadResponseModel> {
          try {
            return await this.profitControlHeadService.getAllProfitControlHead();
          } catch (error) {
            // return errorHandler(AllProfitControlHeadResponseModel, error);
            return this.applicationExceptionHandler.returnException(AllProfitControlHeadResponseModel, error);
          }
        }

        @Post('/getAllActiveProfitControlHead')
  @ApiBody({type:ProfitControlHeadDTO})
  async getAllActiveProfitControlHead(): Promise<AllProfitControlHeadResponseModel> {
    try {
      return await this.profitControlHeadService.getAllActiveProfitControlHead();
    } catch (error) {
      // return errorHandler(AllProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllProfitControlHeadResponseModel, error);
    }
  }

  @Post('/activeteOrDeactivateProfitControlHead')
  @ApiBody({type:ProfitControlHeadDTO})
  async activeteOrDeactivateProfitControlHead( @Body()request:any ): Promise<AllProfitControlHeadResponseModel> {
    try {
      return await this.profitControlHeadService.activateOrDeactivateProfitControlHead(request);
    } catch (error) {
      // return errorHandler(AllProfitControlResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllProfitControlHeadResponseModel, error);
    }
  }

  @Post('/getActiveProfitControlHeadById')
  async getActiveProfitControlHeadById(profitreq: ProfitControlHeadRequest): Promise<AllProfitControlHeadResponseModel> {
    try {
      return await this.profitControlHeadService.getActiveProfitControlHeadById(profitreq);
    } catch (error) {
      // return errorHandler(AllProfitControlHeadResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllProfitControlHeadResponseModel, error);
    }
    
}
}

