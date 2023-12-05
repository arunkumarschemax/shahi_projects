import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { ThicknessService } from "./thickness.service";
import { ColumnResponseModel, CommonResponseModel, ThicknessActivateReq, ThicknessResponseModel } from "@project-management-system/shared-models";

@ApiTags('thickness')
@Controller('thicknesss')
export class ThicknessController {
    constructor(
        private thicknessService: ThicknessService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }

    @Post('/createThickness')
    async createThickness(@Body() req:any): Promise<ThicknessResponseModel> {
        try {
            return await this.thicknessService.createThickness(req,false);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(ThicknessResponseModel, error)
        }
    }

    @Post('/updateThickness')
    async updateThickness(@Body() req:any): Promise<ThicknessResponseModel> {
        try {
            return await this.thicknessService.createThickness(req,true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(ThicknessResponseModel, error)
        }
    }

    @Post('/getAllThicknessInfo')
    async getAllThicknessInfo(): Promise<ThicknessResponseModel> {
        try {
            return await this.thicknessService.getAllThicknessInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(ThicknessResponseModel, error)
        }
    }

    @Post('/activateOrDeactivateThickness')
    @ApiBody({type:ThicknessActivateReq})
    async activateOrDeactivateThickness(@Body() req:any): Promise<ThicknessResponseModel> {
        try {
            return await this.thicknessService.activateOrDeactivateThickness(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(ThicknessResponseModel, error)
        }
    }

    @Post('/getAllActiveThicknessInfo')
    async getAllActiveThicknessInfo(): Promise<ThicknessResponseModel> {
        try {
            return await this.thicknessService.getAllActiveThicknessInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(ThicknessResponseModel, error)
        }
    }

}