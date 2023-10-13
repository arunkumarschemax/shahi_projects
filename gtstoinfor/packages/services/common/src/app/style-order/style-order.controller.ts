import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleOrderService } from "./style-order.service";
import { CommonResponseModel, StyleOrderReq, StyleOrderResponseModel, styleOrderReq } from "@project-management-system/shared-models";


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
    // @ApiBody({type:styleOrderReq})
    async getAllStyleOrders(@Body() req:any):Promise<CommonResponseModel>{
        try{
            console.log(req,'controller');
            
            return await this.styleOrderService.getAllStyleOrders(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }
    @Post('/getAllCoLinesById')
    @ApiBody({type:styleOrderReq})
    async getAllCoLinesById(@Body() req:any):Promise<CommonResponseModel>{
        try{
            console.log(req,'controller');
            
            return await this.styleOrderService.getAllCoLinesById(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }
}