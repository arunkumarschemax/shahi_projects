import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleOrderService } from "./style-order.service";
import { CoUpdateResponseModel, CommonResponseModel, StyleOrderIdReq, StyleOrderReq, StyleOrderResponseModel, styleOrderReq } from "@project-management-system/shared-models";
import { StyleOrderId } from "./style-order-id.request";
import { CoUpdateDto } from "./dto/co-update.dto";
import { StyleOrderColineIdReq } from "./style-order.colineId.request";


@ApiTags('styleOrder')
@Controller('styleOrder')
export class StyleOrderController{
    constructor(
        private readonly styleOrderService :StyleOrderService,
     private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}

    @Post('/createCustomerOrder')
    async createCustomerOrder(@Body() req:any):Promise<StyleOrderResponseModel>{
        try{
            return await this.styleOrderService.createCustomerOrder(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(StyleOrderResponseModel,err)
        }
    }
    @Post('/getAllStyleOrdersByItem')
     @ApiBody({type:styleOrderReq})
    async getAllStyleOrders(@Body() req:any):Promise<CommonResponseModel>{
        try{
          
            return await this.styleOrderService.getAllStyleOrders(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }
    @Post('/getAllCoLinesById')
    @ApiBody({type:styleOrderReq})
    async getAllCoLinesById(@Body() req:any):Promise<CommonResponseModel>{
        try{            
            return await this.styleOrderService.getAllCoLinesById(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/cancelOrder')
    async cancelOrder(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.styleOrderService.cancelOrder(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/cancelVariantOrder')
    async cancelVariantOrder(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.styleOrderService.cancelVariantOrder(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getCOInfoById')
    async getCOInfoById(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.styleOrderService.getCOInfoById(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getCoLineItemsByDestination')
    async getCoLineItemsByDestination(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.styleOrderService.getCoLineItemsByDestination(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getCoNumber')
    async getCoNumber(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.styleOrderService.getCoNumber()
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getCoLineDataById')
    @ApiBody({type:StyleOrderId})

    async getCoLineDataById(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.styleOrderService.getCoLineDataById(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/updateCoData')
    @ApiBody({type:CoUpdateDto})

    async updateCoData(@Body() req:any):Promise<CoUpdateResponseModel>{
        console.log(req,"contr")
        try{
            return await this.styleOrderService.updateCoData(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CoUpdateResponseModel,err)
        }
    }
  
    @Post('/getCoamendment')
    // @ApiBody({type:styleOrderReq})
    async getCoamendment(@Body() req:any):Promise<CommonResponseModel>{
        try{            
            return await this.styleOrderService.getCoamendment()
            
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getConumber')
    // @ApiBody({type:styleOrderReq})
    async getConumber(@Body() req:any):Promise<CommonResponseModel>{
        try{            
            return await this.styleOrderService.getCoNumber()
            
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getDestinationInOrderLines')
    async getDestinationInOrderLines():Promise<CommonResponseModel>{
        try{            
            return await this.styleOrderService.getDestinationInOrderLines()
            
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

}