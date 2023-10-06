import { Controller,Post,Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ItemSkuService } from "./sku-generation.service";
import { SKUGenerationResponseModel } from "@project-management-system/shared-models";

@ApiTags('itemSkus')
@Controller('itemSkus')
export class ItemSkuController{
    constructor(
        private itemSkuService: ItemSkuService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler
        ) {}

    @Post('/createItemSku')
    async createItemSku(@Body() req:any):Promise<SKUGenerationResponseModel>{
        try{
            return await this.itemSkuService.createItemSku(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(SKUGenerationResponseModel,err)
        }
    }

}