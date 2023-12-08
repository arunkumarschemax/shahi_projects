// import { Controller } from "@nestjs/common";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { RLOrdersService } from "./rl-orders.service";
import { Body, Controller, Post, Param, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { CommonResponseModel } from "@project-management-system/shared-models";


@Controller("/rl-orders")
export class RLOrdersController {
    constructor(
        private rlOrdersService: RLOrdersService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
    ) { }

    @Post('/getPdfFileInfo')
    async getPdfFileInfo(): Promise<CommonResponseModel> {
        try {
            return this.rlOrdersService.getPdfFileInfo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getorderData')
    async getorderData(): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getorderData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
}