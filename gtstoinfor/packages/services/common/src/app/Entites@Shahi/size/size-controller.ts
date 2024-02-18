import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { CommonResponseModel } from '@project-management-system/shared-models';
import {  SizeService } from './size-service';


@Controller('/size')
export class SizeController {
    constructor(
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,
        private addressService: SizeService

    ) { }

    @Post('/saveSizeInfo')
    async saveSizeInfo(@Body() data: any): Promise<CommonResponseModel> {
        try {
            return this.addressService.saveSizeInfo(data);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getSizeInfo')
    async getSizeInfo(): Promise<CommonResponseModel> {
        try {
            return this.addressService.getSizeInfo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    


}