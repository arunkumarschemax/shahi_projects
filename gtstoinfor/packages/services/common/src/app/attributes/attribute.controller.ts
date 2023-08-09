import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AttributeService } from './attribute.service';
import { AttributeDto } from './dto/attribute.dto';
import { AllAttributesResponse, AttributeAgainstEnum, AttributeResponse } from '@project-management-system/shared-models';
import { AttributeRequest } from './dto/attribute.request';
import { Attributes } from './attributes.entity';
import { AttributeAgainstRequest } from './dto/attribute-against.request';



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

    @Post('/getAllAttributes')
    async getAllAttributes(): Promise<AllAttributesResponse>{
        try{
            return await this.attributeService.getAllAttributes()
        }catch (error){
            return this.applicationExceptionHandler.returnException(AllAttributesResponse,error)
        }
    }

    @Post('/getAllActiveAttributes')
    async getAllActiveAttributes(): Promise<AllAttributesResponse>{
        try{
            return await this.attributeService.getAllActiveAttributes()
        }catch (error){
            return this.applicationExceptionHandler.returnException(AllAttributesResponse,error)
        }
    }

    @Post('/activateOrDeactivateAttributes')
    @ApiBody({type:AttributeRequest})
    async activateOrDeactivateAttributes(@Body() req: any): Promise<AttributeResponse>{
        console.error(req,'________________________________')
        try{
            return await this.attributeService.activateOrDeactivateAttributes(req)
        }catch (error){
            return this.applicationExceptionHandler.returnException(AttributeResponse,error)
        }
    }

    @Post('/getAttributeByAttributeAgainst')
    @ApiBody({type:AttributeAgainstRequest})
    async getAttributeByAttributeAgainst(@Body() req: any): Promise<AllAttributesResponse>{
        console.log(req,'________________________________')
        try{
            return await this.attributeService.getAttributeByAttributeAgainst(req)
        }catch (error){
            return this.applicationExceptionHandler.returnException(AllAttributesResponse,error)
        }
    }

    



}
