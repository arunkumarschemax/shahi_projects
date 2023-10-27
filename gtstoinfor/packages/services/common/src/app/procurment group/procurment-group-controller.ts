import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ProcurmentGroup } from './procurment-group-entity';
import { CommonResponseModel, ProcurmentGroupModel, ProcurmentGroupRequest, ProfitControlHeadResponseModel } from '@project-management-system/shared-models';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ProfitControlHeadDTO } from '../profit-control-head/dto/profit-control-head.dto';
import { ProfitControlHeadService } from '../profit-control-head/profit-control-head.service';
import { ProcurmentGroupService } from './procurment-group-service';




@Controller('ProcurmentGroup')
@ApiTags('/ProcurmentGroup')
export class ProcurmentGroupController{
    constructor(private procurmentGroupService: ProcurmentGroupService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

        @Post('/getAllProcurmentGroup')
        async getAllProcurmentGroup(): Promise<CommonResponseModel> {
        try {
            return await this.procurmentGroupService.getAllProcurmentGroup();
        } catch (error) {
            // return errorHandler(ProcurmentGroupResponseModel,error);
            return this.applicationExceptionHandler.returnException(CommonResponseModel,error);
        }
        }

        @Post('/createProcurmentGroup')
        @ApiBody({type:ProcurmentGroupRequest})
        async createProcurmentGroup(@Body() req:any): Promise<ProcurmentGroupModel> {
        try {
            console.log(req,'ppppppppppp');
            
            return await this.procurmentGroupService.createProcurmentGroup(req);
        } catch (error) {
            // return errorHandler(ProcurmentGroupResponseModel,error);
            return this.applicationExceptionHandler.returnException(ProcurmentGroupModel,error);
        }
        }
        @Post('/updateProcurmentGroup')
        @ApiBody({type:ProcurmentGroupRequest})
        async updateProcurmentGroup(@Body() req:any): Promise<ProcurmentGroupModel> {
        try {

            
            return await this.procurmentGroupService.updateProcurmentGroup(req);
        } catch (error) {
            // return errorHandler(ProcurmentGroupResponseModel,error);
            return this.applicationExceptionHandler.returnException(ProcurmentGroupModel,error);
        }
        }
        
    @Post('/ActivateOrDeactivateProcurmentGroup')
    @ApiBody({type:ProcurmentGroupRequest})
    async ActivateOrDeactivateProcurmentGroup(@Body() dto:any,isUpdate:boolean=false): Promise<ProcurmentGroupModel> {
    try {
        return await this.procurmentGroupService.ActivateOrDeactivateProcurmentGroup(dto);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(ProcurmentGroupModel, error);
      }
    }

   

    @Post('/getAllActiveProcurmentGroup')
    @ApiBody({type:ProcurmentGroupRequest})
    async getAllActiveProcurmentGroup():Promise<ProcurmentGroupModel>{
      try{
        return await this.procurmentGroupService.getAllActiveProcurmentGroup()
      }catch(error){
        return this.applicationExceptionHandler.returnException(ProcurmentGroupModel,error)
      }
    }

      }