import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ProductGroup } from './product-group-entity';
import { CommonResponseModel, ProfitControlHeadResponseModel } from '@project-management-system/shared-models';
import { ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ProfitControlHeadDTO } from '../profit-control-head/dto/profit-control-head.dto';
import { ProfitControlHeadService } from '../profit-control-head/profit-control-head.service';
import { ProductGroupService } from './product-group-service';



@Controller('productGroup')
export class ProductGroupController{
    constructor(private ProductGroupService: ProductGroupService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

        @Post('/getAllProductGroup')
        async getAllProductGroup(): Promise<CommonResponseModel> {
        try {
            return await this.ProductGroupService.getAllProductGroup();
        } catch (error) {
            // return errorHandler(ProductGroupResponseModel,error);
            return this.applicationExceptionHandler.returnException(CommonResponseModel,error);
        }
        }


      }