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

    @Post('/getSavedData')
    async getSavedData(): Promise<CommonResponseModel> {
        try {
            return this.ordersService.getSavedData();
        } catch (err) {
            return this.applicationExceptionHandler.returnException(CommonResponseModel, err);

        }
    }
}
