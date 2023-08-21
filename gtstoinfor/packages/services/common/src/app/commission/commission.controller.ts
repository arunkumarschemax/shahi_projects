import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { CommissionDTO } from './dto/commission.dto';
import { CommissionService } from './commission.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllCommissionResponseModel, CommissionResponseModel } from '@project-management-system/shared-models';
import { CommissionRequest } from './dto/commission.request';


@ApiTags('commission')
@Controller('commission')
export class CommissionController {
    constructor(private commissionService: CommissionService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    @Post('/createCommission')
    @ApiBody({type:CommissionDTO})
    async createCommission(@Body() req:any): Promise<CommissionResponseModel> {
    try {
        return await this.commissionService.createCommission(req, false);
    } catch (error) {
        return this.applicationExceptionHandler.returnException(CommissionResponseModel, error);
    }
    }
  
    @Post('/updateCommission')
    @ApiBody({type: CommissionDTO})
    async updateCommission(@Body() dto: any): Promise<CommissionResponseModel> {
      try {
        return await this.commissionService.createCommission(dto, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(CommissionResponseModel, error);
      }
    }


  @Post('/getAllCommissions')
  async getAllCommissions(): Promise<AllCommissionResponseModel> {
    try {
      return await this.commissionService.getAllCommissions();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllCommissionResponseModel, error);
    }
  }

  @Post('/getAllActiveCommission')
  async getAllActiveCommission(): Promise<AllCommissionResponseModel> {
    try {
      return await this.commissionService.getAllActiveCommission();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(AllCommissionResponseModel, error);
    }
  }

  @Post('/activateOrDeactivateCommission')
  @ApiBody({type: CommissionRequest})
  async activateOrDeactivateCommission(@Body() req: any): Promise<CommissionResponseModel> {
    try {
      return await this.commissionService.activateOrDeactivateCommission(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommissionResponseModel, error);
    }
  }

  @Post('/getActiveCommissionById')
  async getActiveCommissionById(@Body() req: CommissionRequest ): Promise<CommissionResponseModel> {
      try {
          return await this.commissionService.getActiveCommissionById(req);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(CommissionResponseModel, err);
      }
  }
}
