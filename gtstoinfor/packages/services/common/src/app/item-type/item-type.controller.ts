
import { AllItemTypeResponseModel } from '@project-management-system/shared-models';
import { ItemTypeResponseModel,ItemTypeDropDownResponse } from '@project-management-system/shared-models';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { ItemTypeService } from './item-type.service';
import { ItemTypeRequest } from './dto/item-type.request';
import { ItemTypeDtos } from './dto/item-type.dto';

@ApiTags('itemType')
@Controller('itemType')
export class ItemTypeController{
    constructor(private itemTypeService: ItemTypeService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

        @Post('/createItemType')
        @ApiBody({type: ItemTypeDtos})
        async createItemType(@Body() itemDTO:any,isUpdate:boolean=false): Promise<ItemTypeResponseModel> {
        try {
            return await this.itemTypeService.createItemType(itemDTO, false);
        } catch (error) {
            // return errorHandler(SizeResponseModel,error);
            return this.applicationExceptionHandler.returnException(ItemTypeResponseModel, error);
        }
        }

        @Post('/updateItemType')
        @ApiBody({type:ItemTypeDtos})
        async updateItemType(@Body() itemDTO: any): Promise<ItemTypeResponseModel> {
          try {
            return await this.itemTypeService.createItemType(itemDTO, true);
          } catch (error) {
            // return errorHandler(ItemTypeResponseModel, error);
            return this.applicationExceptionHandler.returnException(ItemTypeResponseModel, error);
          }
        }

        @Post('/getAllItemType')
        async getAllItemType(): Promise<AllItemTypeResponseModel> {
          try {
            // console.log('ooooooooooo')
            return await this.itemTypeService.getAllItemTypes();
          } catch (error) {
            // return errorHandler(AllSizeResponseModel, error);
            return this.applicationExceptionHandler.returnException(AllItemTypeResponseModel, error);
          }
        }

        @Post('/getAllActiveItemType')
  // @ApiBody({type:ItemTypeDtos})
  async getAllActiveItemType(): Promise<AllItemTypeResponseModel> {
    try {
      return await this.itemTypeService.getAllActiveItemTypes();
    } catch (error) {
      // return errorHandler(AllSizeResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllItemTypeResponseModel, error);
    }
  }

  @Post('/activeteOrDeactivateItemType')
  @ApiBody({type:ItemTypeDtos})
  async activeteOrDeactivateItemType( @Body()request:any ): Promise<AllItemTypeResponseModel> {
    try {
      return await this.itemTypeService.activateOrDeactivateItemType
      (request);
    } catch (error) {
      // return errorHandler(AllSizeResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllItemTypeResponseModel, error);
    }
  }

  @Post('/getActiveItemTypeById')
  async getActiveItemTypeById(itemreq: ItemTypeRequest): Promise<AllItemTypeResponseModel> {
    try {
      return await this.itemTypeService.getActiveItemTypeById(itemreq);
    } catch (error) {
      // return errorHandler(AllSizeResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllItemTypeResponseModel, error);
    }
    
}
@Post('/getItemfTypeorDivisionDropDown')
async getItemfTypeorDivisionDropDown(@Body() req:any): Promise<ItemTypeDropDownResponse> {
    try {
     return await this.itemTypeService.getItemTypeForDivisionDropDown(req);
   } catch (error) {
        return this.applicationExceptionHandler.returnException(ItemTypeDropDownResponse, error);
   }
 }
 @Post('/getItemfTypeorProductGroupDropDown')
async getItemfTypeorProductGroupDropDown(@Body() req:any): Promise<ItemTypeDropDownResponse> {
    try {
     return await this.itemTypeService.getItemTypeForProductGroupDropDown(req);
   } catch (error) {
        return this.applicationExceptionHandler.returnException(ItemTypeDropDownResponse, error);
   }
 }
}

