import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BusinessAreaService } from "./business-area.service";
import { BusinessAreaResponseModel } from "@project-management-system/shared-models";

@ApiTags('BusinessArea')
@Controller('business-area')
export class BusinessAreaController {
    constructor(
        private businessAreaService: BusinessAreaService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }

    @Post('/createBusinessArea')
    async createBusinessArea(@Body() req:any): Promise<BusinessAreaResponseModel> {
        try {
            return await this.businessAreaService.createBusinessArea(req,false);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(BusinessAreaResponseModel, error)
        }
    }

    @Post('/updateBusinessArea')
    async updateBusinessArea(@Body() req:any): Promise<BusinessAreaResponseModel> {
        try {
            return await this.businessAreaService.createBusinessArea(req,true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(BusinessAreaResponseModel, error)
        }
    }

    @Post('/getAllBusinessAreaInfo')
    async getAllBusinessAreaInfo(): Promise<BusinessAreaResponseModel> {
        try {
            return await this.businessAreaService.getAllBusinessAreaInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(BusinessAreaResponseModel, error)
        }
    }

    @Post('/activateOrDeactivateBusinessArea')
    async activateOrDeactivateBusinessArea(@Body() req:any): Promise<BusinessAreaResponseModel> {
        try {
            return await this.businessAreaService.activateOrDeactivateBusinessArea(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(BusinessAreaResponseModel, error)
        }
    }

}