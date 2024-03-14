import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, Logger, Get, UseGuards,Req} from '@nestjs/common';
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"
import { ItemsDTO } from './dto/items.dto';
import { ItemsService } from './items.service';
// import { CurrencyResponseModel, AllCurrencyResponseModel } from '@gtpl/shared-models/masters';
import { CommonResponseModel, ItemsRequest } from '@project-management-system/shared-models';
import { AllItemsResponseModel, ItemsResponseModel } from '@project-management-system/shared-models';

@ApiTags('items')
@Controller('items')
export class ItemsController {
    constructor(
        private itemService: ItemsService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
    ){}
    @Post('/createItems')
    async createItems(@Body() itemDto:ItemsDTO,isUpdate:boolean=false): Promise<ItemsResponseModel> {
    try {
      console.log('createItems',itemDto)
        return await this.itemService.createItem(itemDto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(ItemsResponseModel, error);
      }
    }
    @Post('/updateitem')
  async updateitem(@Body() itemDto: ItemsDTO,@Req() request:Request): Promise<ItemsResponseModel> {
    try {
      console.log('update Item');
      console.log(request);
      return await this.itemService.createItem(itemDto, true);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(ItemsResponseModel, error);
    }
  }
  @Post('/getAllItems')
  // @UseGuards(AuthGuard('jwt'))
  async getAllItems(): Promise<CommonResponseModel> {
    try {
      return await this.itemService.getAllItems();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getAllActiveItems')
  async getAllActiveItems(@Req() request: Request): Promise<AllItemsResponseModel> {
      try {
          return await this.itemService.getAllActiveItems();
      } catch (error) {
          return this.applicationExceptionHandler.returnException(AllItemsResponseModel, error)
      }
  }
  @Post('/activateOrDeactivateItems')
  async activateOrDeactivateItems(@Body() itemreq: any): Promise<ItemsResponseModel> {
      try {
          return await this.itemService.activateOrDeactivateItems(itemreq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(ItemsResponseModel, err);
      }
  }
  @Post('/getById')
  async getItemById(@Body() req:ItemsRequest): Promise<ItemsResponseModel> {
      try {
          return await this.itemService.getActiveItemsById(req);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(ItemsResponseModel, err);
      }
  }
}
