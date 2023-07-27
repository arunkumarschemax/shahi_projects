import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentTermsService } from './payment-terms.service';
import { PaymentTermsDTO } from './dto/payment-terms.dto';
import { PaymentTermsResponseModel, AllPaymentTermsResponseModel, PaymentTermsDropDownResponseModel } from '@project-management-system/shared-models';
import { PaymentTermsRequest } from './dto/payment-terms.request';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';

@ApiTags('payment-terms')
@Controller('payment-terms')
export class PaymentTermsController {
    constructor(
        private paymentTermsService: PaymentTermsService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

      ){}
   /**
     * creates or updates a value of paymentTerms
     * @param paymentTermsDto paymentTerms DTO
     * @returns paymentTermsResponse
     */
    @Post('/createPaymentTerms')
    async createPaymentTerms(@Body() paymentTermsDTO:any,isUpdate:boolean=false): Promise<PaymentTermsResponseModel> {
        try {
            console.log(paymentTermsDTO,'pppppp');
            return await this.paymentTermsService.createPaymentTerms(paymentTermsDTO, false);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(PaymentTermsResponseModel, error)
        }
    }

    /**
     * creates or updates a value of paymentTerms
     * @param paymentTermsDto paymentTerms DTO
     * @returns paymentTermsResponse
     */
    @Post('/updatePaymentTerms')
    async updatePaymentTerms(@Body() paymentTermsDTO: PaymentTermsDTO,@Req() request:Request): Promise<PaymentTermsResponseModel> {
        try {
        return await this.paymentTermsService.createPaymentTerms(paymentTermsDTO, true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(PaymentTermsResponseModel, error)
        }
    }

      /**
     * gets all the Value of paymentTerms
     * @returns AllValue paymentTermsResponseModel which returns all the Value Addition Types  along with status (true/false), errortype, errorCode, internal message which provides message to the calling function.
     */
    @Post('/getAllPaymentTerms')
    async getAllPaymentTerms(@Body() req?:UserRequestDto): Promise<AllPaymentTermsResponseModel> {
        try {
            console.log('yessss')
        return await this.paymentTermsService.getAllPaymentTerms(req);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(AllPaymentTermsResponseModel, error)
        }
    }

    @Post('/getAllActivePaymentTerms')
  async getAllActivePaymentTerms(@Req() request: Request): Promise<AllPaymentTermsResponseModel> {
      try {
          return await this.paymentTermsService.getAllActivePaymentTerms();
      } catch (error) {
          return this.applicationExceptionhandler.returnException(AllPaymentTermsResponseModel, error)
      }
  }

     /**
     * Activate Or De-Activate Value PaymentTerms
     * @param getSinglePaymentTerms PaymentTermsResponseModel 
     * @returns Value PaymentTerms
     */
    @Post('/activateOrDeactivatePaymentTerms')
    async activateOrDeactivatePaymentTerms(@Body() paymentTermsReq: any): Promise<PaymentTermsResponseModel> {
        console.log(paymentTermsReq,"controller")
        try {
            return await this.paymentTermsService.activateOrDeactivatePaymentTerms(paymentTermsReq);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(PaymentTermsResponseModel, err);
        }
    }
    @Post('/getPaymentById')
    async getPaymentById(@Body() paymentTermsReq: PaymentTermsRequest): Promise<PaymentTermsResponseModel> {
        try {
            return await this.paymentTermsService.getPaymentById(paymentTermsReq);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(PaymentTermsResponseModel, err);
        }
    }
    /**
     * 
     * @returns PaymentTermsDropDownResponseModel
     */
    @Post('/getAllPaymentTermsDropDown')
    async getAllPaymentTermsDropDown(): Promise<PaymentTermsDropDownResponseModel> {
        try {
        return await this.paymentTermsService.getAllPaymentTermsDropDown();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(PaymentTermsDropDownResponseModel, error)
        }
    }

     /**
     * 
     * @returns PaymentTermsDropDownResponseModel
     */
      @Post('/getAllVendorPaymentTermsDropDown')
      async getAllVendorPaymentTermsDropDown(): Promise<PaymentTermsDropDownResponseModel> {
          try {
          return await this.paymentTermsService.getAllVendorPaymentTermsDropDown();
          } catch (error) {
              return this.applicationExceptionhandler.returnException(PaymentTermsDropDownResponseModel, error)
          }
      }

}

