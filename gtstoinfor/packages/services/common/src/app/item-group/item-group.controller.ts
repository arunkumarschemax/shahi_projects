import { ItemGroupResponseModel,ItemgroupDropDownResponse } from "@project-management-system/shared-models";
import { AllItemGroupResponseModel } from "@project-management-system/shared-models";
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { ItemGroupService } from "./item-group.service";
import { ItemGroupRequest } from "./dto/item-group.request";
import { ItemGroupDto } from "./dto/item-group.dto";@ApiTags('size')
@Controller('itemGroup')
export class ItemGroupController{
    constructor(private iteGroupService: ItemGroupService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

        @Post('/createItemGroup')
        @ApiBody({type: ItemGroupDto})
        async createItemGroup(@Body() itemDTO:any,isUpdate:boolean=false): Promise<ItemGroupResponseModel> {
        try {
            return await this.iteGroupService.createItemGroup(itemDTO, false);
        } catch (error) {
            // return errorHandler(SizeResponseModel,error);
            return this.applicationExceptionHandler.returnException(ItemGroupResponseModel, error);
        }
        }

        @Post('/updateItemGroup')
        @ApiBody({type:ItemGroupDto})
        async updateItemGroup(@Body() itemDTO: any): Promise<ItemGroupResponseModel> {
          try {
            return await this.iteGroupService.createItemGroup(itemDTO, true);
          } catch (error) {
            // return errorHandler(ItemTypeResponseModel, error);
            return this.applicationExceptionHandler.returnException(ItemGroupResponseModel, error);
          }
        }
        @Post('/getAllItemGroup')
        async getAllItemGroup(): Promise<AllItemGroupResponseModel> {
          try {
            return await this.iteGroupService.getAllItemGroup();
          } catch (error) {
            // return errorHandler(AllSizeResponseModel, error);
            return this.applicationExceptionHandler.returnException(AllItemGroupResponseModel, error);
          }
        }

        
        @Post('/getAllActiveItemGroup')
  @ApiBody({type:ItemGroupDto})
  async getAllActiveItemGroup(): Promise<AllItemGroupResponseModel> {
    try {
      return await this.iteGroupService.getAllActiveItemGroup();
    } catch (error) {
      // return errorHandler(AllSizeResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllItemGroupResponseModel, error);
    }
  }

  @Post('/activeteOrDeactivateItemGroup')
  @ApiBody({type:ItemGroupDto})
  async activeteOrDeactivateItemGroup( @Body()request:any ): Promise<AllItemGroupResponseModel> {
    try {
      return await this.iteGroupService.activateOrDeactivateItemGroup(request);
    } catch (error) {
      // return errorHandler(AllSizeResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllItemGroupResponseModel, error);
    }
  }
    }