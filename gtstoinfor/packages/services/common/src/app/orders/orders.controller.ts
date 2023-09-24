import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CommonResponseModel, FileStatusReq, YearReq, FileTypeDto } from '@project-management-system/shared-models';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path'; 
import { FileIdReq } from './models/file-id.req';
import { type } from 'os';
''

@Controller('orders')
export class OrdersController {
    constructor(
        private ordersService: OrdersService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ) { }

    @Post('/saveOrder/:id/:month')
    async saveOrder(@Param('id') id: number, @Param('month') month: number, @Body() data: any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.saveOrdersData(data, id, month);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getOrdersData')
    async getOrdersData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getOrdersData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getQtyChangeData')
    async getQtyChangeData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getQtyChangeData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getQtyDifChangeData')
    async getQtyDifChangeData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getQtyDifChangeData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getContractDateChangeData')
    async getContractDateChangeData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getContractDateChangeData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getWharehouseDateChangeData')
    async getWharehouseDateChangeData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getWharehouseDateChangeData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getUnitWiseOrders')
    async getUnitWiseOrders(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getUnitWiseOrders();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getDivisionWiseOrders')
    async getDivisionWiseOrders(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getDivisionWiseOrders();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getMaximumChangedOrders')
    async getMaximumChangedOrders(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getMaximumChangedOrders();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/revertFileData')
    async revertFileData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.revertProjectionFileData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/fileUpload/:month/:fileType')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', {
        limits: { files: 1 },
        storage: diskStorage({
            destination: './upload-files',
            filename: (req, file, callback) => {
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

    async fileUpload(@Param('month') month: number,@Param('fileType') fileType:string, @UploadedFile() file): Promise<CommonResponseModel> {
        try {
            return await this.ordersService.updatePath(file.path, file.filename, month,fileType)
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
        }
    }

    @Post('/getUploadFilesData')
    async getUploadFilesData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getUploadFilesData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/updateFileStatus')
    async updateFileStatus(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.updateFileStatus(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getVersionWiseData')
    async getVersionWiseData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getVersionWiseData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPhaseWiseData')
    async getPhaseWiseData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getPhaseWiseData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getPhaseWiseExcelData')
    async getPhaseWiseExcelData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getPhaseWiseExcelData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getAllLatestFileMonthWisedata')
    async getAllLatestFileMonthWisedata(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getAllLatestFileMonthWisedata();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getMonthWiseData')
    async getMonthWiseData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getMonthWiseData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getMonthlyPhaseWiseExcelData')
    async getMonthlyPhaseWiseExcelData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getMonthlyPhaseWiseExcelData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/saveTrimOrder/:id/:month')
    async saveTrimOrder(@Param('id') id: number, @Param('month') month: number, @Body() data: any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.saveTrimOrdersData(data, id, month);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }
    

    @Post('/getTrimOrdersData')
    async getTrimOrdersData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getTrimOrdersData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/revertTrimFileData')
    async revertTrimFileData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.revertTrimFileData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getExfactoryYear')
    async getExfactoryYear(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getExfactoryYear();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getExfactoryMonthData')
    @ApiBody({type:YearReq})
    async getExfactoryMonthData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getExfactoryMonthData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/seasonWiseReport')
    async seasonWiseReport(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.seasonWiseReport();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    
    @Post('/createCOline')
    async createCOline(@Body() req: any) {
        try {
            return await this.ordersService.createCOline(req)
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error)
        }
    }
    
    @Post('/getSeasonWiseOrders')
    async getSeasonWiseOrders(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getSeasonWiseOrders();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }
    @Post('/getYearWiseOrders')
    async getYearWiseOrders(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getYearWiseOrders();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }
    @Post('/getProdPlanCount')
    async getProdPlanCount(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getProdPlanCount();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    
    @Post('/getWareHouseYear')
    async getWareHouseYear(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getWareHouseYear();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getWareHouseMonthData')
    @ApiBody({type:YearReq})
    async getWareHouseMonthData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getExfactoryMonthData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getExfactoryComparisionData')
    @ApiBody({type:YearReq})
    async getExfactoryComparisionData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getExfactoryComparisionData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
}
