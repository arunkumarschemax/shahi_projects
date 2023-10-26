import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CoTypeService } from "./co-type.service";
import { CoTypeResponseModel } from "@project-management-system/shared-models";

@ApiTags('CoTypes')
@Controller('co-types')
export class CoTypeController {
    constructor(
        private coTypeService: CoTypeService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }

    @Post('/createCoType')
    async createCoType(@Body() req:any): Promise<CoTypeResponseModel> {
        try {
            return await this.coTypeService.createCoType(req,false);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CoTypeResponseModel, error)
        }
    }

    @Post('/updateCoType')
    async updateCoType(@Body() req:any): Promise<CoTypeResponseModel> {
        try {
            return await this.coTypeService.createCoType(req,true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CoTypeResponseModel, error)
        }
    }

    @Post('/getAllCoTypeInfo')
    async getAllCoTypeInfo(): Promise<CoTypeResponseModel> {
        try {
            return await this.coTypeService.getAllCoTypeInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CoTypeResponseModel, error)
        }
    }

    @Post('/activateOrDeactivateCoType')
    async activateOrDeactivateCoType(@Body() req:any): Promise<CoTypeResponseModel> {
        try {
            return await this.coTypeService.activateOrDeactivateCoType(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CoTypeResponseModel, error)
        }
    }

}