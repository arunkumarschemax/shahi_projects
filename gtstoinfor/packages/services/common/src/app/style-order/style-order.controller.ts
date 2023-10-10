import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleOrderService } from "./style-order.service";
import { StyleOrderResponseModel } from "@project-management-system/shared-models";

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
}