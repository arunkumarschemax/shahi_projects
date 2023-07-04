import { Injectable } from '@nestjs/common';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { SaveOrderDto } from './models/save-order-dto';

@Injectable()
export class OrdersService {

    async saveOrdersData(dto:SaveOrderDto){
        console.log(dto)
        return new CommonResponseModel(true,1111,'')
    }
}
