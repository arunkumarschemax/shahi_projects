import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';

import { CommonResponseModel, ProfitControlHeadResponseModel, hierachyLevelModel } from '@project-management-system/shared-models';
import { ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ProfitControlHeadDTO } from '../profit-control-head/dto/profit-control-head.dto';
import { ProfitControlHeadService } from '../profit-control-head/profit-control-head.service';
import { HierachyLevelService } from './hirerachy-level-service';





@Controller('hierachyLevel')
export class HierachyLevelController{
    constructor(private hierachyLevelService: HierachyLevelService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

        @Post('/getAllhierachyLevel')
        async getAllhierachyLevel(): Promise<hierachyLevelModel> {
        try {
            return await this.hierachyLevelService.getAllhierachyLevel();
        } catch (error) {
            // return errorHandler(hierachyLevelResponseModel,error);
            return this.applicationExceptionHandler.returnException(hierachyLevelModel,error);
        }
        }


      }