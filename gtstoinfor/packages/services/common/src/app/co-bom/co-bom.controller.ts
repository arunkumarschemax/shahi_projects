import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CoBomService } from './co-bom-service';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { StyleOrderId } from '../style-order/style-order-id.request';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { CoBomDto } from './dto/co-bom.dto';


@Controller('co_bom')
@ApiTags('co_bom')
export class CoBomController{
    constructor(
        private cobom: CoBomService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ){}


    @Post('/getDataForMOPById')
    @ApiBody({type:StyleOrderId})
    async getDataForMOPById(@Body() req:any):Promise<CommonResponseModel>{
        try{
            return await this.cobom.getDataForMOPById(req)
        }catch(err){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,err)
        }
    }


    @Post ('/getBomAgainstItem')
    @ApiBody({type:CoBomDto})
    async getBomAgainstItem(@Body() req:any):Promise<CommonResponseModel>{
        try {
            return await this.cobom.getBomAgainstItem(req);

        }catch (error){
            return this.applicationExceptionHandler.returnException(CommonResponseModel,error)
        }
    }

}