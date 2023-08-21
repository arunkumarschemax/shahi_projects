import { Body, Controller, Post, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { CommonResponseModel } from '@project-management-system/shared-models';
import { DpomService } from './nike-dpom.service';
import { DpomSaveDto } from './dto/dpom-save.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
            return await this.dpomService.saveDPOMApiDataToDataBase()
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/saveDPOMExcelData/:id')
    async saveDPOMExcelData(@Param('id') id: number, @Body() data: any): Promise<CommonResponseModel> {
        try {
            return this.dpomService.saveDPOMExcelData(data, id);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/revertFileData')
    async revertFileData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.dpomService.revertFileData(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/fileUpload')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        limits: { files: 1 },
        storage: diskStorage({
            destination: './upload-files',
            filename: (req, file, callback) => {
                console.log(file.originalname);
                const name = file.originalname;
                callback(null, `${name}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(png|jpeg|PNG|jpg|JPG|xls|xlsx|csv)$/)) {
                return callback(new Error('Only png,jpeg,PNG,jpg,JPG,xls,xlsx and csv files are allowed!'), false);
            }
            callback(null, true);
        },
    }))

    async fileUpload(@UploadedFile() file): Promise<CommonResponseModel> {
        try {
            return await this.dpomService.updatePath(file.path, file.filename)
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error);
        }
    }

    @Post('/getUploadFilesData')
    async getUploadFilesData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getUploadFilesData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
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

    @Post('/getTotalItemQtyChangeData')
    async getTotalItemQtyChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getTotalItemQtyChangeData();
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

    @Post('/getItemChangeData')
    async getItemChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getItemChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getUnitChangeData')
    async getUnitChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getUnitChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getFOBPriceChangeData')
    async getFOBPriceChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getFOBPriceChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getNetInclDiscChangeData')
    async getNetInclDiscChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getNetInclDiscChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getTradingNetInclDiscChangeData')
    async getTradingNetInclDiscChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getTradingNetInclDiscChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getGACChangeData')
    async getGACChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getGACChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getMRGACChangeData')
    async getMRGACChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getMRGACChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getModeOfTransportChangeData')
    async getModeOfTransportChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getModeOfTransportChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPlantCodeChangeData')
    async getPlantCodeChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPlantCodeChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getShippingTypeChangeData')
    async getShippingTypeChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getShippingTypeChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getVasTextChangeData')
    async getVasTextChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getVasTextChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getShipToCustomerChangeData')
    async getShipToCustomerChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getShipToCustomerChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getInventorySegmentCodeChangeData')
    async getInventorySegmentCodeChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getInventorySegmentCodeChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getDirectShipSoNoChangeData')
    async getDirectShipSoNoChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getDirectShipSoNoChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getDestinationCountryChangeData')
    async getDestinationCountryChangeData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getDestinationCountryChangeData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getDestinationWisePo')
    async getDestinationWisePo(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getDestinationWisePo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getSeasonWisePo')
    async getSeasonWisePo(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getSeasonWisePo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
}

