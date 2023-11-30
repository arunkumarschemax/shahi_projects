import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PurchaseOrderService } from './purchase-order-service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { CommonResponseModel, PurchaseOrderDto, PurchaseViewDto, VendorIdReq } from '@project-management-system/shared-models';

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
  @ApiBody({type: PurchaseViewDto})
  async getAllPoData(@Req() req?:any): Promise<CommonResponseModel> {

    try {
      return await this.purchasseOrdrSerivice.getAllPoData(req.body);
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

  @Post('/getPODataById')
  @ApiBody({type: VendorIdReq})
  async getPODataById(@Body() req: any): Promise<CommonResponseModel> {
    try {
      return await this.purchasseOrdrSerivice.getPODataById(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getMaterialTpye')
  async getMaterialTpye( ): Promise<CommonResponseModel> {
    try {
      return await this.purchasseOrdrSerivice.getMaterialTpye();
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getAllPurchaseOrderData')
  @ApiBody({type:PurchaseViewDto})
  async getAllPurchaseOrderData(@Body() req?: any ): Promise<CommonResponseModel> {
    try {
      console.log(">>>>>>>>>>>>>>>>>>");
      
      return await this.purchasseOrdrSerivice.getAllPurchaseOrderData(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }
  @Post('/getPodetailsById')
  @ApiBody({type:PurchaseViewDto})
  async getPodetailsById(@Body() req?: any ): Promise<CommonResponseModel> {
    try {
      console.log(">>>>>>>>>>>>>>>>>>");
      
      return await this.purchasseOrdrSerivice.getPodetailsById(req);
    } catch (error) {
      return this.applicationExceptionHandler.returnException(CommonResponseModel, error);
    }
  }

  



}


