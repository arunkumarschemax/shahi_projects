import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ItemsService } from "./item.service";
import { AllItemsResponseModel } from "@project-management-system/shared-models";
import {ApplicationExceptionHandler} from "packages/libs/backend-utils/src/"

@ApiTags('items')
@Controller('items')
export class ItemsController{
    constructor(
        private readonly itemsService :ItemsService,
     private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}
    @Post('/creteItems')
    async creteItems(@Body() dto:any,isUpdate:boolean=false): Promise<AllItemsResponseModel> {
    try {
        return await this.itemsService.creteItems(dto, false);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(AllItemsResponseModel, error);
      }
    }
    @Post('/ActivateOrDeactivateItem')
    async ActivateOrDeactivateItem(@Body() dto:any,isUpdate:boolean=false): Promise<AllItemsResponseModel> {
    try {
        return await this.itemsService.ActivateOrDeactivateItem(dto);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(AllItemsResponseModel, error);
      }
    }
}