// import { Controller } from "@nestjs/common";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { RLOrdersService } from "./rl-orders.service";
import { Body, Controller, Post, Param, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { CommonResponseModel, PoOrderFilter } from "@project-management-system/shared-models";
import { ApiBody } from "@nestjs/swagger";


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
    @ApiBody({ type: PoOrderFilter })   
    async getorderData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.rlOrdersService.getorderData(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getorderDataByPoNumber')
    @ApiBody({ type: PoOrderFilter })   
    async getorderDataByPoNumber(@Body() req:any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.rlOrdersService.getorderDataByPoNumber(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
}