import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { DeliveryMethodDTO } from './dto/delivery-method.dto';
import { DeliveryMethodService } from './delivery-method.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllDeliveryResponseModel, DeliveryMethodResponseModel } from '@project-management-system/shared-models';
import { DeliveryMethodRequest } from './dto/delivery-method.request';


@ApiTags('delivery-method')
@Controller('delivery-method')
export class DeliveryMethodController {
    constructor(private deliveryMethodService: DeliveryMethodService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    @Post('/createDeliveryMethod')
    // @ApiBody({type:DeliveryMethodDTO})
    async createDeliveryMethod(@Body() deliveryMethodDTO:any): Promise<DeliveryMethodResponseModel> {
      console.log('--------------------------------------')
      console.log(deliveryMethodDTO)
      console.log('--------------------------------------')

    try {
        return await this.deliveryMethodService.createDeliveryMethod(deliveryMethodDTO, false);
    } catch (error) {
        // return errorHandler(DeliveryMethodResponseModel,error);
        return this.applicationExceptionHandler.returnException(DeliveryMethodResponseModel, error);
    }
    }
  
    @Post('/updateDeliveryMethod')
    @ApiBody({type: DeliveryMethodDTO})
    async updateDeliveryMethod(@Body() deliveryMethodDTO: any): Promise<DeliveryMethodResponseModel> {
      try {
        return await this.deliveryMethodService.createDeliveryMethod(deliveryMethodDTO, true);
      } catch (error) {
        return this.applicationExceptionHandler.returnException(DeliveryMethodResponseModel, error);
      }
    }
  @Post('/getAllDeliveryMethods')
  async getAllDeliveryMethods(): Promise<AllDeliveryResponseModel> {
    try {
      return await this.deliveryMethodService.getAllDeliveryMethods();
    } catch (error) {
      // return errorHandler(AllDeliveryResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllDeliveryResponseModel, error);
    }
  }
  @Post('/getAllActiveDeliveryMethods')
  async getAllActiveDeliveryMethods(): Promise<AllDeliveryResponseModel> {
    try {
      return await this.deliveryMethodService.getAllActiveDeliveryMethods();
    } catch (error) {
      // return errorHandler(AllDeliveryResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllDeliveryResponseModel, error);
    }
  }

  @Post('/activateOrDeactivateDeliveryMethod')
  @ApiBody({type: DeliveryMethodRequest})
  async activateOrDeactivateDeliveryMethod(@Body() deliveryMethodReq: any): Promise<DeliveryMethodResponseModel> {
    try {
      return await this.deliveryMethodService.activateOrDeactivateDeliveryMethod(deliveryMethodReq);
    } catch (error) {
      // return errorHandler(AllDeliveryResponseModel, error);
      return this.applicationExceptionHandler.returnException(DeliveryMethodResponseModel, error);
    }
  }

  @Post('/getDeliveryMethodById')
  async getCurrencyById(@Body() deliveryMethodReq: DeliveryMethodRequest ): Promise<DeliveryMethodResponseModel> {
      try {
          return await this.deliveryMethodService.getActiveDeliveryMethodById(deliveryMethodReq);
      } catch (err) {
          return this.applicationExceptionHandler.returnException(DeliveryMethodResponseModel, err);
      }
  }
}
