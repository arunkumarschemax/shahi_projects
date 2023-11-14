import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PurchaseOrderService } from './purchase-order-service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CommonResponseModel, PurchaseOrderDto, VendorIdReq } from '@project-management-system/shared-models';

@ApiTags('po')
@Controller('po')
export class PurchaseOrderController {
    constructor(private purchasseOrdrSerivice: PurchaseOrderService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}
      

  @Post('/cretePurchaseOrder')
  async cretePurchaseOrder(@Body() req?:any): Promise<CommonResponseModel> {

    try {
      return await this.purchasseOrdrSerivice.cretePurchaseOrder(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getAllPoData')
  async getAllPoData(): Promise<CommonResponseModel> {
    try {
      return await this.purchasseOrdrSerivice.getAllPoData();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  @Post('/getAllPONumbers')
  @ApiBody({type: VendorIdReq})
  async getAllPONumbers(@Body() req:any): Promise<CommonResponseModel> {
    try {
      return await this.purchasseOrdrSerivice.getAllPONumbers(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

}