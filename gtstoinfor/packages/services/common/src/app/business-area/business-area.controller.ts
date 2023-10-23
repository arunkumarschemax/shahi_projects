import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { BusinessAreaService } from "./business-area.service";
import { BusinessAreaResponseModel } from "@project-management-system/shared-models";

@ApiTags('business_area')
@Controller('business_area')
export class BusinessAreaController {
    constructor(
        private businessAreaService: BusinessAreaService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

    ) { }

    @Post('/getAllBusinessAreaInfo')
    async getAllBusinessAreaInfo(): Promise<BusinessAreaResponseModel> {
        try {
            return await this.businessAreaService.getAllBusinessAreaInfo();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(BusinessAreaResponseModel, error)
        }
    }

}