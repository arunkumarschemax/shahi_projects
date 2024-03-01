import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel, PoOrderFilter } from '@project-management-system/shared-models';
import { ColorService } from './color-service';
import { ApiBody } from '@nestjs/swagger';


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
    @ApiBody({ type: PoOrderFilter }) 
    async getColorInfo(@Body() req?: any): Promise<CommonResponseModel> {
        try {
            return this.addressService.getColorInfo(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getDistinctPoNumber')
    async getDistinctPoNumber(): Promise<CommonResponseModel> {
        try {
            return this.addressService.getDistinctPoNumber();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }


    


}