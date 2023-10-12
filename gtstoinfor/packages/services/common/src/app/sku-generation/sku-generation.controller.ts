import { Controller,Post,Body } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ItemSkuService } from "./sku-generation.service";
import { CommonResponseModel, ItemCodeReq, ItemSKusReq, SKUGenerationResponseModel } from "@project-management-system/shared-models";

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

    @Post('/cancelSKUById')
    @ApiBody({type: ItemSKusReq})
    async cancelSKUById(@Body() req:any):Promise<SKUGenerationResponseModel>{
        try{
            return await this.itemSkuService.cancelSKUById(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(SKUGenerationResponseModel,err)
        }
    }

    @Post('/getDestinationsByItem')
    async getDestinationsByItem(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.itemSkuService.getDestinationsByItem(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getDataByDestinationAgainstItem')
    async getDataByDestinationAgainstItem(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.itemSkuService.getDataByDestinationAgainstItem(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getDataByItem')
    async getDataByItem(@Body() req:any):Promise<SKUGenerationResponseModel>{
        try{
            return await this.itemSkuService.getDataByItem(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(SKUGenerationResponseModel,err)
        }
    }

}