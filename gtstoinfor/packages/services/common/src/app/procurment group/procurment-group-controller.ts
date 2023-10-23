import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ProcurmentGroup } from './procurment-group-entity';
import { CommonResponseModel, ProfitControlHeadResponseModel } from '@project-management-system/shared-models';
import { ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ProfitControlHeadDTO } from '../profit-control-head/dto/profit-control-head.dto';
import { ProfitControlHeadService } from '../profit-control-head/profit-control-head.service';
import { ProcurmentGroupService } from './procurment-group-service';




@Controller('ProcurmentGroup')
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


      }