// import { UserRequestDto } from '@gtpl/shared-models/common-models';
// import { PaymentModeResponseModel, AllPaymentResponseModel } from '@gtpl/shared-models/masters';
import { PaymentMethodResponseModel } from '@project-management-system/shared-models';
import { AllPaymentMethodResponseModel } from '@project-management-system/shared-models';

import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { PaymentMethodDTO } from './dto/payment-method.dto';
// import { UserRequestDto } from '../../currencies/dto/user-logs-dto';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodRequest } from './dto/payment-request';
@ApiTags('payment-methods')
@Controller('paymentmethods')
export class PaymentMethodController {
    constructor(private paymentMethodService: PaymentMethodService,
      private readonly applicationExceptionHandler: ApplicationExceptionHandler
      ) {}

    @Post('/createPaymentMethod')
    async createPaymentMethod(@Body() paymentMethodDTO:PaymentMethodDTO,isUpdate:boolean=false): Promise<PaymentMethodResponseModel> {
    try {
        return await this.paymentMethodService.createPaymentMethod(paymentMethodDTO, false);
    } catch (error) {
        // return errorHandler(PaymentModeResponseModel,error);
        return this.applicationExceptionHandler.returnException(PaymentMethodResponseModel, error);
    }
    }
  
  @Post('/updatePaymentMethod')
  @ApiBody({type:PaymentMethodDTO})
  async updatePaymentMethods(@Body() paymentMethodDTO: any): Promise<PaymentMethodResponseModel> {
    try {
      return await this.paymentMethodService.createPaymentMethod(paymentMethodDTO, true);
    } catch (error) {
      // return errorHandler(PaymentModeResponseModel, error);
      return this.applicationExceptionHandler.returnException(PaymentMethodResponseModel, error);
    }
  }
  @Post('/getAllPaymentMethods')
  async getAllPaymentMethods(): Promise<AllPaymentMethodResponseModel> {
    try {
      return await this.paymentMethodService.getAllPaymentMethods();
    } catch (error) {
      // return errorHandler(AllPaymentResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllPaymentMethodResponseModel, error);
    }
  }
  @Post('/getAllActivePaymentMethod')
  @ApiBody({type:PaymentMethodDTO})
  async getAllActivePaymentMethods(): Promise<AllPaymentMethodResponseModel> {
    try {
      return await this.paymentMethodService.getAllActivePaymentMethods();
    } catch (error) {
      // return errorHandler(AllPaymentResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllPaymentMethodResponseModel, error);
    }
  }

  @Post('/activeteOrDeactivateMethod')
  @ApiBody({type:PaymentMethodDTO})
  async activateOrDeactivatePaymentMethod( @Body()request:any ): Promise<AllPaymentMethodResponseModel> {
    try {
      return await this.paymentMethodService.activateOrDeactivateCurrency(request);
    } catch (error) {
      // return errorHandler(AllPaymentResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllPaymentMethodResponseModel, error);
    }
  }

  @Post('/getActivePaymentMethodById')
  async getActivePaymentMethodById(paymentreq: PaymentMethodRequest): Promise<AllPaymentMethodResponseModel> {
    try {
      return await this.paymentMethodService.getActivePaymentMethodById(paymentreq);
    } catch (error) {
      // return errorHandler(AllPaymentResponseModel, error);
      return this.applicationExceptionHandler.returnException(AllPaymentMethodResponseModel, error);
    }
    
}
// @Post('/getPaymentMethodById')
// async getPaymentMethodById(paymentMethodId: number): Promise<PaymentMethodResponseModel> {
//   try {
//     return await this.paymentMethodService.getPaymentMethodById(paymentMethodId);
//   } catch (error) {
//     // return errorHandler(AllPaymentResponseModel, error);
//     return this.applicationExceptionHandler.returnException(PaymentMethodResponseModel, error);
//   }
  
// }

}
