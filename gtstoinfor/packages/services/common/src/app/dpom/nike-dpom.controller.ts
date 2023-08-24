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
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/getDPOMOrderDetails')
    async getDPOMOrderDetails() {
        try {
            return await this.dpomService.getDPOMOrderDetails()
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/saveDPOMDataToDataBase')
    async saveDPOMDataToDataBase() {
        try {
            return await this.dpomService.saveDPOMDataToDataBase()
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }
    @Post('/getPPMData')
    async getPPMData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPPMData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

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
    async getByFactoryStatus(@Body() req: DpomSaveDto): Promise<any> {
        return await this.dpomService.getByFactoryStatus(req);
    }

    @Post('/getShipmentTrackerReport')
    async getShipmentTrackerReport(): Promise<CommonResponseModel> {
        try {
            return await this.dpomService.getShipmentTrackerReport();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getDivertReportData')
    async getDivertReportData(): Promise<CommonResponseModel> {
        try {
            return await this.dpomService.getDivertReportData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getFabricTrackerReport')
    async getFabricTrackerReport(): Promise<CommonResponseModel> {
        try {
            return await this.dpomService.getFabricTrackerReport();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }


    @Post('/getCountForDivertReport')
    async getCountForDivertReport(): Promise<CommonResponseModel> {
        try {
            return await this.dpomService.getCountForDivertReport();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
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

    @Post('/getCategoryWiseItemQty')
    async getCategoryWiseItemQty(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getCategoryWiseItemQty();
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



    @Post('/getShipmentWiseData')
    async getShipmentWiseData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getShipmentWiseData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getPlanShipmentWiseData')
    async getPlanShipmentWiseData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPlanShipmentWiseData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }



    @Post('/getShipmentPlaningChart')
    async getShipmentPlaningChart(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getShipmentPlaningChart();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/approveDpomLineItemStatus')
    async approveDpomLineItemStatus(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.dpomService.approveDpomLineItemStatus(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getQtyChangeData')
    async getQtyChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getQtyChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/poLineItemStatusChange')
    async poLineItemStatusChange(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.poLineItemStatusChange();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

}

