import { Body, Controller, Post } from '@nestjs/common';
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { CommonResponseModel } from '@project-management-system/shared-models';
import { DpomService } from './nike-dpom.service';
import { DpomSaveDto } from './dto/dpom-save.dto';

@Controller('/nike-dpom')
export class DpomController {
    constructor(
        private dpomService: DpomService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler
    ) { }

    @Post('/getOctaToken')
    async getOctaToken() {
        try {
            return await this.dpomService.getOctaToken()
        } catch (error) {
            console.log(error);
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getDPOMOrderDetails')
    async getDPOMOrderDetails() {
        try {
            return await this.dpomService.getDPOMOrderDetails()
        } catch (error) {
            console.log(error);
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/saveDPOMDataToDataBase')
    async saveDPOMDataToDataBase() {
        try {
            return await this.dpomService.saveDPOMDataToDataBase()
        } catch (error) {
            console.log(error);
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getFactoryReportData')
    async getFactoryReportData(): Promise<CommonResponseModel> {
        try {
            return await this.dpomService.getFactoryReportData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getByFactoryStatus')
    async getByFactoryStatus(@Body()req:DpomSaveDto):Promise<any>{
        return await this.dpomService.getByFactoryStatus(req);
    }

    @Post('/getPlantWisePoOrders')
    async getPlantWisePoOrders(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPlantWisePoOrders();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getStatusWiseItems')
    async getStatusWiseItems(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getStatusWiseItems();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getOrderAcceptanceData')
    async getOrderAcceptanceData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getOrderAcceptanceData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/approveDpomLineItemStatus')
    async approveDpomLineItemStatus(@Body() req : any): Promise<CommonResponseModel> {
        try {
            return this.dpomService.approveDpomLineItemStatus(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }
       
    }

