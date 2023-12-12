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

    @Post('/saveOrdersDataFromPDF')
    async saveOrdersDataFromPDF(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.rlOrdersService.saveOrdersDataFromPDF(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

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
    async getorderData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.rlOrdersService.getorderData(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getorderDataByPoNumber')
    @ApiBody({ type: PoOrderFilter })
    async getorderDataByPoNumber(@Body() req: any): Promise<CommonResponseModel> {
        try {
            // console.log(req,"con")
            return await this.rlOrdersService.getorderDataByPoNumber(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/coLineCreationReq')
    async coLineCreationReq(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.coLineCreationReq(req)
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getCoLine')
    async getCoLine(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getCoLine(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getBuyerPo')
    async getBuyerPo(): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getBuyerPo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getColineItem')
    async getColineItem(): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getColineItem();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getColineOrderNo')
    async getColineOrderNo(): Promise<CommonResponseModel> {
        try {
            return await this.rlOrdersService.getColineOrderNo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
}