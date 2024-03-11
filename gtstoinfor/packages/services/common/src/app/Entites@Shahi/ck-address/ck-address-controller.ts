import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from '@project-management-system/shared-models';
import { CkAddressService } from './ck-address-service';


@Controller('/ckAddress')
export class CkAddressController {
    constructor(
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,
        private ckAddressService: CkAddressService

    ) { }

    @Post('/ckSaveAddressInfo')
    async ckSaveAddressInfo(@Body() data: any): Promise<CommonResponseModel> {
        console.log(data,"opopopop")
        try {
            return this.ckAddressService.ckSaveAddressInfo(data);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getCkAddressInfo')
    async getCkAddressInfo(): Promise<CommonResponseModel> {
        try {
            return this.ckAddressService.getCkAddressInfo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getCkAddressInfoByCountry')
    async getCkAddressInfoByCountry(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.ckAddressService.getCkAddressInfoByCountry(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }


}