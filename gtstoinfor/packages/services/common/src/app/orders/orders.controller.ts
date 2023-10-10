import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CommonResponseModel, FileStatusReq, YearReq, FileTypeDto, SeasonWiseRequest, CompareOrdersFilterReq, orders, COLineRequest, TrimOrdersReq, ordersPlanNo } from '@project-management-system/shared-models';
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
    @ApiBody({type:orders})
    async getOrdersData(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getOrdersData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getQtyChangeData')
    async getQtyChangeData(@Body() req :any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getQtyChangeData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }

    @Post('/getQtyDifChangeData')
    async getQtyDifChangeData(@Body() req :any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getQtyDifChangeData(req);
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

    // @Post('/getVersionWiseData')
    // async getVersionWiseData(): Promise<CommonResponseModel> {
    //     try {
    //         return this.ordersService.getVersionWiseData();
    //     } catch (err) {
    //         return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    //     }
    // }

    @Post('/getversion')
    @ApiBody({type:ordersPlanNo})
    async getversion(@Body() req:any):Promise<CommonResponseModel>{
        try{
            console.log(req,"OOOOOOOOOOOO")
            return this.ordersService.getversion(req);

        }catch(err){
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
    @ApiBody({type:TrimOrdersReq})
    async getTrimOrdersData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getTrimOrdersData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getTrimOrdersNo')
    async getTrimOrdersItems(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getTrimOrdersNo();
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
    @Post('/getMonthWiseReportData')
    @ApiBody({type:YearReq})
    async getMonthWiseReportData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getMonthWiseReportData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/seasonWiseReport')
    @ApiBody({type: SeasonWiseRequest})
    async seasonWiseReport(@Body() req?:any): Promise<CommonResponseModel> {
        try {
            console.log(req,'lllllllllllllllll')
            return this.ordersService.seasonWiseReport(req);
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
    
    @Post('/getWareHouseYearData')
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
            return this.ordersService.getWareHouseMonthData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getMonthlyComparisionData')
    @ApiBody({type:YearReq})
    async getMonthlyComparisionData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getMonthlyComparisionData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    // @Post('/getWareHouseComparisionData')
    // @ApiBody({type:YearReq})
    // async getWareHouseComparisionData(@Body() req:any): Promise<CommonResponseModel> {
    //     try {
    //         return this.ordersService.getWareHouseComparisionData(req);
    //     } catch (err) {
    //         return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
    //     }
    // }
    
    @Post('/getExfactoryComparisionExcelData')
    @ApiBody({type:YearReq})
    async getExfactoryComparisionExcelData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getExfactoryComparisionExcelData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }  @Post('/getExfactoryMonthExcelData')
    @ApiBody({type:YearReq})
    async getExfactoryMonthExcelData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getExfactoryMonthExcelData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getSeasonWiseItemCode')
    async getSeasonWiseItemCode(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getSeasonWiseItemCode();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getSeasonWiseItemName')
    async getSeasonWiseItemName(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getSeasonWiseItemName();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getQtyDifChangeItemCode')
    async getQtyDifChangeItemCode(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getQtyDifChangeItemCode();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }
    @Post('/getWareHouseComparisionExcelData')
    @ApiBody({type:YearReq})
    async getWareHouseComparisionExcelData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getWareHouseComparisionExcelData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    } 
    
    @Post('/getWareHouseMonthExcelData')
    @ApiBody({type:YearReq})
    async getWareHouseMonthExcelData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getWareHouseMonthExcelData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Get('/processEmails')
    async processEmails() {
        try {
            return this.ordersService.processEmails();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
        // try {
        
        // await this.ordersService.processEmails();
        // return { message: 'Email processing completed.' };
        // } catch (error) {
        // throw new HttpException(
        //     'An error occurred during email processing.',
        //     HttpStatus.INTERNAL_SERVER_ERROR,
        // );
        // }
    }
    @Post('/readCell')
    async readCell(@Body() req:any): Promise<CommonResponseModel> {
        try {
            const pathval = './upload-files/pro_orders_1.xlsx'
             this.ordersService.readCell(pathval,pathval);
            } catch (err) {
                return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
            }
    }
    @Post('/getOrdersStatus')
    async getOrdersStatus(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getOrdersStatus();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getOrderPlanNo')
    async getOrderPlanNo(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getOrderPlanNo();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/getOrderNumberDropDownInCompare')
    async getOrderNumberDropDownInCompare(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getOrderNumberDropDownInCompare();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/createCOLineInternal')
    async createCOLineInternal(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.createCOLineInternal(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }

    @Post('/updateStatusAfterCoLineCreationInM3')
    async updateStatusAfterCoLineCreationInM3(@Body() req: any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.updateStatusAfterCoLineCreationInM3(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getMonthlyComparisionDate')
    @ApiBody({type:YearReq})
    async getMonthlyComparisionDate(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getMonthlyComparisionDate(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPhaseMonthData')
    @ApiBody({type:YearReq})
    async getPhaseMonthData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getPhaseMonthData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getComparisionphaseData')
    @ApiBody({type:YearReq})
    async getComparisionphaseData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getComparisionphaseData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getComparisionphaseExcelData')
    @ApiBody({type:YearReq})
    async getComparisionphasExceleData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getComparisionphaseExcelData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPhaseMonthExcelData')
    @ApiBody({type:YearReq})
    async getPhaseMonthExcelData(@Body() req:any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getPhaseMonthExcelData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getPhaseItems')
    async getPhaseItems(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getPhaseItems();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
    @Post('/getItemsMonthly')
    async getItemsMonthly(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getItemsMonthly();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);
        }
    }
}
