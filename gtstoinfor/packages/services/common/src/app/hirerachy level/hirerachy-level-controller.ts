import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ProfitControlHeadDTO } from '../profit-control-head/dto/profit-control-head.dto';
import { ProfitControlHeadService } from '../profit-control-head/profit-control-head.service';
import { HierachyLevelService } from './hirerachy-level-service';
import {  HierarchyLevelRequest, hierachyLevelModel } from '@project-management-system/shared-models';





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

        @Post('/createhierachyLevel')
        @ApiBody({type:HierarchyLevelRequest})
        async createhierachyLevel(@Body() req:any): Promise<hierachyLevelModel> {
        try {
            console.log(req,'ppppppppppp');
            
            return await this.hierachyLevelService.createhierachyLevel(req);
        } catch (error) {
            // return errorHandler(hierachyLevelResponseModel,error);
            return this.applicationExceptionHandler.returnException(hierachyLevelModel,error);
        }
        }
        @Post('/updatehierachyLevel')
        @ApiBody({type:HierarchyLevelRequest})
        async updatehierachyLevel(@Body() req:any): Promise<hierachyLevelModel> {
        try {

            
            return await this.hierachyLevelService.updatehierachyLevel(req);
        } catch (error) {
            // return errorHandler(hierachyLevelResponseModel,error);
            return this.applicationExceptionHandler.returnException(hierachyLevelModel,error);
        }
        }
        
    @Post('/ActivateOrDeactivatehierachyLevel')
    @ApiBody({type:HierarchyLevelRequest})
    async ActivateOrDeactivatehierachyLevel(@Body() dto:any,isUpdate:boolean=false): Promise<hierachyLevelModel> {
    try {
        return await this.hierachyLevelService.ActivateOrDeactivatehierachyLevel(dto);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(hierachyLevelModel, error);
      }
    }

   

    @Post('/getAllActivehierachyLevel')
    @ApiBody({type:HierarchyLevelRequest})
    async getAllActivehierachyLevel():Promise<hierachyLevelModel>{
      try{
        return await this.hierachyLevelService.getAllActivehierachyLevel()
      }catch(error){
        return this.applicationExceptionHandler.returnException(hierachyLevelModel,error)
      }
    }

      }