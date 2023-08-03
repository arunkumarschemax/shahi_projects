import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AttributeService } from './attribute.service';
import { AttributeDto } from './dto/attribute.dto';
import { AttributeResponse } from '@project-management-system/shared-models';



@Controller('attributes')
@ApiTags('attributes')
export class AttributeController {
    constructor(
        private attributeService: AttributeService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ){}

    @Post('/createAttribute')
    @ApiBody({type: AttributeDto})
    async createAttribute(@Body() req: any): Promise<AttributeResponse>{
        try{
            return await this.attributeService.createAttribute(req, false)
        }catch (error){
            return this.applicationExceptionHandler.returnException(AttributeResponse,error)
        }
    }

    @Post('/updateAttribute')
    @ApiBody({type: AttributeDto})
    async updateAttribute(@Body() req: any): Promise<AttributeResponse>{
        try{
            return await this.attributeService.createAttribute(req, true)
        }catch (error){
            return this.applicationExceptionHandler.returnException(AttributeResponse,error)
        }
    }



}
