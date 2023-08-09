import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ComponentMappingService } from "./component-mapping.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ComponentMappingResponseModel } from "@project-management-system/shared-models";
import { ComponentMappingDto } from "./dto/component-mapping.dto";
import { ComponentMappingFilterReq } from "./dto/component-mapping-filter.req";

@ApiTags('component-mapping')
@Controller('component-mapping')
export class ComponentMappingController{
    constructor(
        private componentMappingService : ComponentMappingService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,
    ){}

    @Post('/createComponentMapping')
    async createComponentMapping(@Body() req:any):Promise<ComponentMappingResponseModel>{
        console.log(req,'--------------req')
        try{
            return await this.componentMappingService.createComponentMapping(req,false)
        } catch(err){
            return this.applicationExceptionHandler.returnException(ComponentMappingResponseModel, err);
        }
    }

    @Post('/updateComponentMapping')
    async updateComponentMapping(@Body() req:any):Promise<ComponentMappingResponseModel>{
        console.log(req,'--------------req')
        try{
            return await this.componentMappingService.createComponentMapping(req,true)
        } catch(err){
            return this.applicationExceptionHandler.returnException(ComponentMappingResponseModel, err);
        }
    }

    @Post('/getMappedComponents')
    async getMappedComponents(@Body() req:any):Promise<ComponentMappingResponseModel>{
        try{
            return await this.componentMappingService.getMappedComponents(req)
        } catch(err){
            return this.applicationExceptionHandler.returnException(ComponentMappingResponseModel, err);
        }
    }

     @Post('/getStyleDropDown')
    async getStyleDropDown():Promise<ComponentMappingResponseModel>{
        try{
            return await this.componentMappingService.getStyleDropDown()
        } catch(err){
            return this.applicationExceptionHandler.returnException(ComponentMappingResponseModel, err);
        }
    }

    @Post('/getGarmentCategoryDropDown')
    async getGarmentCategoryDropDown():Promise<ComponentMappingResponseModel>{
        try{
            return await this.componentMappingService.getGarmentCategoryDropDown()
        } catch(err){
            return this.applicationExceptionHandler.returnException(ComponentMappingResponseModel, err);
        }
    }

    @Post('/getGarmentDropDown')
    async getGarmentDropDown():Promise<ComponentMappingResponseModel>{
        try{
            return await this.componentMappingService.getGarmentDropDown()
        } catch(err){
            return this.applicationExceptionHandler.returnException(ComponentMappingResponseModel, err);
        }
    }
    

}