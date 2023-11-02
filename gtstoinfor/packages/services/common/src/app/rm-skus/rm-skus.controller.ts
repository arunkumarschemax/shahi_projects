import { Controller,Post,Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RmSkusService } from "./rm-skus.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { RmSkuResponseModel } from "@project-management-system/shared-models";

@ApiTags('RMSkus')
@Controller('rm-skus')
export class RmSkusController {
    constructor(
        private rmSkuService: RmSkusService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }

    @Post('/createRmSku')
    async createRmSku(@Body() req:any):Promise<RmSkuResponseModel>{
        try{
            return await this.rmSkuService.createRmSkus(req)
        }catch(err){
            return this.applicationExceptionhandler.returnException(RmSkuResponseModel,err)
        }
    }

 
}