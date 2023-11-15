import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ProductGroup } from './product-group-entity';
import { CommonResponseModel, ProductGroupModel, ProductGroupRequest, ProfitControlHeadResponseModel } from '@project-management-system/shared-models';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { ProfitControlHeadDTO } from '../profit-control-head/dto/profit-control-head.dto';
import { ProfitControlHeadService } from '../profit-control-head/profit-control-head.service';
import { ProductGroupService } from './product-group-service';
import { type } from 'os';
import { productGroupDto } from '../rm-items/dto/product-group-filter';



@Controller('productGroup')
@ApiTags('/productGroup')
export class ProductGroupController{
    constructor(private ProductGroupService: ProductGroupService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

        @Post('/getAllProductGroup')
        async getAllProductGroup(): Promise<ProductGroupModel> {
        try {
            return await this.ProductGroupService.getAllProductGroup();
        } catch (error) {
            // return errorHandler(ProductGroupResponseModel,error);
            return this.applicationExceptionHandler.returnException(ProductGroupModel,error);
        }
        }
        @Post('/createProductGroup')
        @ApiBody({type:ProductGroupRequest})
        async createProductGroup(@Body() req:any): Promise<ProductGroupModel> {
        try {
            console.log(req,'ppppppppppp');
            
            return await this.ProductGroupService.createProductGroup(req);
        } catch (error) {
            // return errorHandler(ProductGroupResponseModel,error);
            return this.applicationExceptionHandler.returnException(ProductGroupModel,error);
        }
        }
        @Post('/updateProductGroup')
        @ApiBody({type:ProductGroupRequest})
        async updateProductGroup(@Body() req:any): Promise<ProductGroupModel> {
        try {

            
            return await this.ProductGroupService.updateProductGroup(req);
        } catch (error) {
            // return errorHandler(ProductGroupResponseModel,error);
            return this.applicationExceptionHandler.returnException(ProductGroupModel,error);
        }
        }
        
    @Post('/ActivateOrDeactivateProductGroup')
    @ApiBody({type:ProductGroupRequest})
    async ActivateOrDeactivateProductGroup(@Body() dto:any,isUpdate:boolean=false): Promise<ProductGroupModel> {
    try {
      console.log(dto,'ddddddddddd');

      return await this.ProductGroupService.ActivateOrDeactivateProductGroup(dto);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(ProductGroupModel, error);
      }
    }

   

    @Post('/getAllActiveProductGroup')
    @ApiBody({type:ProductGroupRequest})
    async getAllActiveProductGroup():Promise<ProductGroupModel>{
      try{
        return await this.ProductGroupService.getAllActiveProductGroup()
      }catch(error){
        return this.applicationExceptionHandler.returnException(ProductGroupModel,error)
      }
    }

    @Post('/getProductGroupById')
    @ApiBody({type:productGroupDto})
    async getProductGroupById(@Body() req:any):Promise<CommonResponseModel>{
      try{
        return await this.ProductGroupService.getProductGroupById(req)
      }catch(error){
        return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
      }
    }

      }