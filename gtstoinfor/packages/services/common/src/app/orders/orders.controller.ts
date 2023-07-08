import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { SaveOrderDto } from './models/save-order-dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private ordersService: OrdersService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler

    ) { }


    @Post('/saveOrder')
    async saveOrder(@Body() dto: any[]): Promise<CommonResponseModel> {
        try {
            return this.ordersService.saveOrdersData(dto);
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
}
