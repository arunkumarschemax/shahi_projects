import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'multer';

@Controller('orders')
export class OrdersController {
    constructor(
        private ordersService: OrdersService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ) { }

    // @Post('/saveOrder')
    // @UseInterceptors(FileInterceptor('csvFile'))
    // async upload(@UploadedFile() file: MulterFile) {
    //     console.log('----------------------', file)
    //     try {
    //         await this.ordersService.saveOrdersData(file.buffer.toString());
    //         return { message: 'CSV file uploaded and data saved successfully' };
    //     } catch (error) {
    //         return { error: 'Failed to save CSV data to the database' };
    //     }
    // }

    @Post('/saveOrder')
    async saveOrder(@Body() data: any): Promise<CommonResponseModel> {
        console.log('--------file------', data)
        try {
            return this.ordersService.saveOrdersData(data);
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
}
