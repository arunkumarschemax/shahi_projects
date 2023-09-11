import { Body, Controller, Post, Param, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { ApplicationExceptionHandler } from "packages/libs/backend-utils/src/"
import { CommonResponseModel, FobPriceDiffRequest, PpmDateFilterRequest, nikeFilterRequest } from '@project-management-system/shared-models';
import { DpomService } from './nike-dpom.service';
import { DpomSaveDto } from './dto/dpom-save.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DiaPDFDto } from './dto/diaPDF.dto';
import { PoAndQtyReq } from './dto/po-qty.req';
import { log } from 'console';
import { type } from 'os';
import { FactoryUpdate } from './dto/factory-update.req';

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

    // @Post('/getCRMOrderDetails2')
    // async getCRMOrderDetails2() {
    //     try {
    //         return await this.dpomService.getCRMOrderDetails2()
    //     } catch (error) {
    //         return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
    //     }
    // }

    @Post('/createCOline')
    async createCOline() {
        try {
            return await this.dpomService.createCOline({ poNumber: 3504865987, poLineItemNumber: 10000, scheduleLineItemNumber: 100 })
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

    @Post('/saveDIAPDFData')
    async saveDIAPDFData(@Body() req: any) {
        try {
            return await this.dpomService.saveDIAPDFData(req)
        } catch (error) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, error)
        }
    }

    @Post('/saveLegalPOPDFData')
    async saveLegalPOPDFData(@Body() req: any) {
        try {
            return await this.dpomService.saveLegalPOPDFData(req)
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
    @ApiBody({ type: PpmDateFilterRequest })
    async getPPMData(@Body() req?: any): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPPMData(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getFactoryReportData')
    @ApiBody({ type: PpmDateFilterRequest })
    async getFactoryReportData(@Body() req?: any): Promise<CommonResponseModel> {
        try {
            return await this.dpomService.getFactoryReportData(req);
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
    @ApiBody({ type: nikeFilterRequest })
    async getOrderAcceptanceData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getOrderAcceptanceData(req);
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
    async getTotalItemQtyChangeData(@Body() req: nikeFilterRequest): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getTotalItemQtyChangeData(req);
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

    @Post('/getDifferentialData')
    async getDifferentialData(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getDifferentialData();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPoAndQtyDashboard')
    @ApiBody({ type: PoAndQtyReq })
    async getPoAndQtyDashboard(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPoAndQtyDashboard(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    // @Post('/weeklyPoAndQtyDashboard')
    // @ApiBody ({type: PoAndQtyReq})
    // async weeklyPoAndQtyDashboard(@Body()req:any): Promise<CommonResponseModel> {
    //     try {
    //         return this.dpomService.weeklyPoAndQtyDashboard(req);
    //     } catch (err) {
    //         return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
    //     }
    // }
    /////--------------------------------------------------------------------------------------------------------->factory
    @Post('/getPpmPoLineForFactory')
    async getPpmPoLineForFactory(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmPoLineForFactory();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPpmItemForFactory')
    async getPpmItemForFactory(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmItemForFactory();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPpmFactoryForFactory')
    async getPpmFactoryForFactory(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmFactoryForFactory();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPpmPlantForFactory')
    async getPpmPlantForFactory(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmPlantForFactory();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPpmProductCodeForFactory')
    async getPpmProductCodeForFactory(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmProductCodeForFactory();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPpmColorDescForFactory')
    async getPpmColorDescForFactory(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmColorDescForFactory();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPpmCategoryDescForFactory')
    async getPpmCategoryDescForFactory(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmCategoryDescForFactory();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPpmDestinationCountryForFactory')
    async getPpmDestinationCountryForFactory(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmDestinationCountryForFactory();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }


    // @Post('/getPpmItemForMarketing')
    // async getPpmItemForMarketing(): Promise<CommonResponseModel> {
    //     try {
    //         return this.dpomService.getPpmItemForMarketing();
    //     } catch (err) {
    //         return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
    //     }
    // }
    ////-----------------------------------------------------------------------------------------------marketing
    @Post('/getPpmPoLineForMarketing')
    async getPpmPoLineForMarketing(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmPoLineForMarketing();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPpmItemForMarketing')
    async getPpmItemForMarketingy(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmItemForMarketing();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPpmFactoryForMarketing')
    async getPpmFactoryForMarketing(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmFactoryForMarketing();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/updateFactoryStatusColumns')
    @ApiBody({ type: FactoryUpdate })
    async updateFactoryStatusColumns(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.dpomService.updateFactoryStatusColumns(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPriceDifferenceReport')
    @ApiBody({ type: FobPriceDiffRequest })
    async getPriceDifferenceReport(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPriceDifferenceReport(req);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPpmPlantForMarketing')
    async getPpmPlantForMarketing(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmPlantForMarketing();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPpmProductCodeForMarketing')
    async getPpmProductCodeForMarketing(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmProductCodeForMarketing();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPpmColorDescForMarketing')
    async getPpmColorDescForMarketing(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmColorDescForMarketing();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPpmCategoryDescForMarketing')
    async getPpmCategoryDescForMarketing(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmCategoryDescForMarketing();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPpmDestinationCountryForMarketing')
    async getPpmDestinationCountryForMarketing(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmDestinationCountryForMarketing();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPpmProductCodeForOrderCreation')
    async getPpmProductCodeForOrderCreation(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmProductCodeForOrderCreation();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPpmPoLineForOrderCreation')
    async getPpmPoLineForOrderCreation(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmPoLineForOrderCreation();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPpmPoLineForNikeOrder')
    async getPpmPoLineForNikeOrder(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPpmPoLineForNikeOrder();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPriceDiffPoLinedd')
    async getPriceDiffPoLinedd(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPriceDiffPoLinedd();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPriceDiffStyleNumber')
    async getPriceDiffStyleNumber(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPriceDiffStyleNumber();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPriceDiffSizeDescription')
    async getPriceDiffSizeDescription(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPriceDiffSizeDescription();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPdfFileInfo')
    async getPdfFileInfo(): Promise<CommonResponseModel> {
        try {
            return this.dpomService.getPdfFileInfo();
        } catch (err) {
            return this.applicationExceptionhandler.returnException(CommonResponseModel, err);
        }
    }
}

