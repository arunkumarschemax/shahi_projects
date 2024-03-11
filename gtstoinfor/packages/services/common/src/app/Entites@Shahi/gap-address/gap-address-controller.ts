import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { GapAddressService } from './gap-address-service';
import { CommonResponseModel } from '@project-management-system/shared-models';


@Controller('/gapAddress')
export class GapAddressController {
    constructor(
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,
        private gapAddressService: GapAddressService

    ) { }

    @Post('/gapSaveAddressInfo')
    async gapSaveAddressInfo(@Body() data: any): Promise<CommonResponseModel> {
        console.log(data,"opopopop")
        try {
            return this.gapAddressService.gapSaveAddressInfo(data);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getGapAddressInfo')
    async getGapAddressInfo(): Promise<CommonResponseModel> {
        try {
            return this.gapAddressService.getGapAddressInfo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getGapAddressInfoByCountry')
    async getGapAddressInfoByCountry(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.gapAddressService.getGapAddressInfoByCountry(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }


}