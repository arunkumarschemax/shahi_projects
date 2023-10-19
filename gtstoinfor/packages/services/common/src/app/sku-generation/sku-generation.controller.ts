import { Controller,Post,Body } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ItemSkuService } from "./sku-generation.service";
import { CommonResponseModel, ItemCodeReq, ItemSKusReq, SKUGenerationResponseModel, SKUlistFilterRequest } from "@project-management-system/shared-models";

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

    @Post('/closeSKUById')
    @ApiBody({type: ItemSKusReq})
    async closeSKUById(@Body() req:any):Promise<SKUGenerationResponseModel>{
        try{
            return await this.itemSkuService.closeSKUById(req)
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

    @Post('/getSkuList')
    @ApiBody({type:SKUlistFilterRequest})
    async getSkuList(@Body() req:any):Promise<SKUGenerationResponseModel>{
        try{
            return await this.itemSkuService.getSkuList(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(SKUGenerationResponseModel,err)
        }
    }
    @Post('/getAllitemsCode')
    async getAllitemsCode():Promise<SKUGenerationResponseModel>{
        try{
            return await this.itemSkuService.getItemCode()
        }catch(err){
            return this.applicationExceptionHandler.returnException(SKUGenerationResponseModel,err)
        }
    }
}