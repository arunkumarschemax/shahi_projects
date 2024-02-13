import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from '@project-management-system/shared-models';
import { ColorService } from './color-service';


@Controller('/color')
export class ColorController {
    constructor(
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,
        private addressService: ColorService

    ) { }

    @Post('/saveColorInfo')
    async saveColorInfo(@Body() data: any): Promise<CommonResponseModel> {
        try {
            return this.addressService.saveColorInfo(data);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getColorInfo')
    async getColorInfo(): Promise<CommonResponseModel> {
        try {
            return this.addressService.getColorInfo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    


}