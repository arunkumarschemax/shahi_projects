import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { TypeActivateReq, TypeReq, TypeResponseModel } from "@project-management-system/shared-models";
import { TypeService } from "./type.service";

@ApiTags('Type')
@Controller('Type')
export class TypeController {
    constructor(
        private typeService: TypeService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }

    @Post('/createType')
    @ApiBody({type:TypeReq})
    async createType(@Body() req:any): Promise<TypeResponseModel> {
        try {
            return await this.typeService.createType(req,false);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(TypeResponseModel, error)
        }
    }

    @Post('/updateType')
    @ApiBody({type:TypeReq})
    async updateType(@Body() req:any): Promise<TypeResponseModel> {
        try {
            return await this.typeService.createType(req,true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(TypeResponseModel, error)
        }
    }

    @Post('/getAllTypeInfo')
    async getAllTypeInfo(): Promise<TypeResponseModel> {
        try {
            return await this.typeService.getAllTypeInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(TypeResponseModel, error)
        }
    }

    @Post('/activateOrDeactivateType')
    @ApiBody({type:TypeActivateReq})
    async activateOrDeactivateType(@Body() req:any): Promise<TypeResponseModel> {

        try {
            return await this.typeService.activateOrDeactivateType(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(TypeResponseModel, error)
        }
    }

    @Post('/getAllActiveTypeInfo')
    async getAllActiveTypeInfo(): Promise<TypeResponseModel> {
        try {
            return await this.typeService.getAllActiveTypeInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(TypeResponseModel, error)
        }
    }

}