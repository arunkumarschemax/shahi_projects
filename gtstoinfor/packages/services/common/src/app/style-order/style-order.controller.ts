import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleOrderService } from "./style-order.service";
import { CoLineResponseModel, CoUpdateResponseModel, CommonResponseModel, StyleOrderIdReq, StyleOrderReq, StyleOrderResponseModel, styleOrderReq } from "@project-management-system/shared-models";
import { StyleOrderId } from "./style-order-id.request";
import { CoUpdateDto } from "./dto/co-update.dto";
import { StyleOrderColineIdReq } from "./style-order.colineId.request";
import { CoLineService } from "./co-line.service";
import { CoLineReq } from "./dto/co-line.req";


@ApiTags('styleOrder')
@Controller('styleOrder')
export class StyleOrderController{
    constructor(
        private readonly styleOrderService :StyleOrderService,
     private readonly applicationExceptionHandler: ApplicationExceptionHandler,
     private readonly coLineService :CoLineService,

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
            return await this.styleOrderService.getCoamendment(req)
            
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getconumbered')
    // @ApiBody({type:styleOrderReq})
    async getconumbered(@Body() req:any):Promise<CommonResponseModel>{
        try{            
            return await this.styleOrderService.getconumbered()
            
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/getcoparameter')
    // @ApiBody({type:styleOrderReq})
    async getcoparameter(@Body() req:any):Promise<CommonResponseModel>{
        console.log(req,"servv")
        try{            
            return await this.styleOrderService.getcoparameter()
            
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

    @Post('/getCoLineInfoById')
    @ApiBody({type:StyleOrderId})

    async getCoLineInfoById(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.styleOrderService.getCoLineInfoById(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }

    @Post('/createCoLine')
    // @ApiBody({type:CoLineReq})
    async createCoLine(@Body() req:any):Promise<CoLineResponseModel>{
        try{
            return await this.coLineService.createCoLine(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CoLineResponseModel,err)
        }
    }

}