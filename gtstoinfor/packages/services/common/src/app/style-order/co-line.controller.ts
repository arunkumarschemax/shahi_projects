import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StyleOrderService } from "./style-order.service";
import { CoLineResponseModel } from "@project-management-system/shared-models";
import { CoLineService } from "./co-line.service";
import { CoLineReq } from "./dto/co-line.req";


@ApiTags('co-line')
@Controller('co-line')
export class CoLineController{
    constructor(
        private readonly coLineService :CoLineService,
     private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ){}

    @Post('/createCoLine')
    @ApiBody({type:CoLineReq})
    async createCustomerOrder(@Body() req:any):Promise<CoLineResponseModel>{
        try{
            return await this.coLineService.createCoLine(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CoLineResponseModel,err)
        }
    }


}