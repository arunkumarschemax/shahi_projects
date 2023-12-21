import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { AddressService } from './address-service';
import { CommonResponseModel } from '@project-management-system/shared-models';


@Controller('/address')
export class AddressController {
    constructor(
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,
        private addressService: AddressService

    ) { }

    @Post('/saveAddressInfo')
    async saveAddressInfo(@Body() data: any): Promise<CommonResponseModel> {
        try {
            return this.addressService.saveAddressInfo(data);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getAddressInfo')
    async getAddressInfo(): Promise<CommonResponseModel> {
        try {
            return this.addressService.getAddressInfo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getAddressInfoByCountry')
    async getAddressInfoByCountry(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.addressService.getAddressInfoByCountry(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }


}