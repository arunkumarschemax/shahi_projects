import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { StructureService } from "./structure.service";
import { ColumnResponseModel, CommonResponseModel, StructureActivateReq, StructureReq, StructureResponseModel } from "@project-management-system/shared-models";

@ApiTags('structure')
@Controller('structure')
export class StructureController {
    constructor(
        private structureService: StructureService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }

    @Post('/createStructure')
    async createStructure(@Body() req:any): Promise<StructureResponseModel> {
        try {
            return await this.structureService.createStructure(req,false);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(StructureResponseModel, error)
        }
    }

    @Post('/updatestructure')
    async updateStructure(@Body() req:any): Promise<StructureResponseModel> {
        try {
            return await this.structureService.createStructure(req,true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(StructureResponseModel, error)
        }
    }

    @Post('/getAllStrucutreInfo')
    async getAllStrucutreInfo(): Promise<StructureResponseModel> {
        try {
            return await this.structureService.getAllStrucutreInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(StructureResponseModel, error)
        }
    }

    @Post('/activateOrDeactivateStructure')
    @ApiBody({type:StructureActivateReq})
    async activateOrDeactivateStructure(@Body() req:any): Promise<StructureResponseModel> {
        try {
            return await this.structureService.activateOrDeactivateStructure(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(StructureResponseModel, error)
        }
    }

    @Post('/getAllActiveStructureInfo')
    async getAllActiveThicknessInfo(): Promise<StructureResponseModel> {
        try {
            return await this.structureService.getAllActiveStructure();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(StructureResponseModel, error)
        }
    }

}