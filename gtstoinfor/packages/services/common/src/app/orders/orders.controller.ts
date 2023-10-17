import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CommonResponseModel, FileStatusReq } from '@project-management-system/shared-models';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path'; import { FileIdReq } from './models/file-id.req';
''

@Controller('orders')
export class OrdersController {
    constructor(
        private ordersService: OrdersService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ) { }

    @Post('/saveOrder/:id')
    async saveOrder(@Param('id') id: number, @Body() data: any): Promise<CommonResponseModel> {
        try {
            return this.ordersService.saveOrdersData(data, id);
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
            return this.ordersService.revertFileData(req);
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

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
            return await this.ordersService.updatePath(file.path, file.filename)
        } catch (error) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
        }
    }

    @Post('/getUploadFilesData')
    async getUploadFilesData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getUploadFilesData();
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
}
