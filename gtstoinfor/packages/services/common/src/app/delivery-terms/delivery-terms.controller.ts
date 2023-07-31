import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DeliveryTermsService } from './delivery-terms.service';
import { DeliveryTermsDTO } from './dto/delivery-terms.dto';
import { DeliveryTermsRequest } from './dto/delivery-terms.request';
import { UserRequestDto } from './dto/user-logs-dto';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { AllDeliveryTermsResponseModel, DeliveryTermsDropDownResponseModel, DeliveryTermsResponseModel } from '@project-management-system/shared-models';


@ApiTags('delivery_terms')
@Controller('deliveryterms')
export class DeliveryTermsController {
    constructor(
        private deliveryTermsService: DeliveryTermsService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

      ){}
   /**
     * creates or updates a value of deliveryTerms
     * @param deliveryTermsDto deliveryTerms DTO
     * @returns deliveryTermsResponse
     */
    @Post('/createDeliveryTerms')
    async createDeliveryTerms(@Body() deliveryTermsDTO:DeliveryTermsDTO,isUpdate:boolean=false,@Req() request:Request): Promise<DeliveryTermsResponseModel> {
        try {
            // console.log(deliveryTermsDTO);
            return await this.deliveryTermsService.createDeliveryTerms(deliveryTermsDTO, false,request);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(DeliveryTermsResponseModel, error)
        }
    }

    /**
     * creates or updates a value of deliveryTerms
     * @param deliveryTermsDto deliveryTerms DTO
     * @returns deliveryTermsResponse
     */
    @Post('/updateDeliveryTerms')
    async updateDeliveryTerms(@Body() deliveryTermsDTO: DeliveryTermsDTO,@Req() request:Request): Promise<DeliveryTermsResponseModel> {
        try {
        return await this.deliveryTermsService.createDeliveryTerms(deliveryTermsDTO, true,request);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(DeliveryTermsResponseModel, error)
        }
    }

      /**
     * gets all the Value of deliveryTerms
     * @returns AllValue deliveryTermsResponseModel which returns all the Value Addition Types  along with status (true/false), errortype, errorCode, internal message which provides message to the calling function.
     */
    @Post('/getAllDeliveryTerms')
    async getAllDeliveryTerms(): Promise<AllDeliveryTermsResponseModel> {
        try {
        return await this.deliveryTermsService.getAllDeliveryTerms();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(AllDeliveryTermsResponseModel, error)
        }
    }

     /**
     * Activate Or De-Activate Value DeliveryTerms
     * @param getSingleDeliveryTerms DeliveryTermsResponseModel 
     * @returns Value DeliveryTerms
     */
    @Post('/activateOrDeactivateDeliveryTerms')
    @ApiBody({type:DeliveryTermsRequest})
    async activateOrDeactivateDeliveryTerms(@Body() deliveryTermsReq: any): Promise<DeliveryTermsResponseModel> {
        try {
            return await this.deliveryTermsService.activateOrDeactivateDeliveryTerms(deliveryTermsReq);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(DeliveryTermsResponseModel, err);
        }
    }
    @Post('/getAllActiveDeliveryTerms')
  async getAllActiveDeliveryTerms(@Req() request: Request): Promise<AllDeliveryTermsResponseModel> {
      try {
          return await this.deliveryTermsService.getAllActiveDeliveryTerms();
      } catch (error) {
          return this.applicationExceptionhandler.returnException(AllDeliveryTermsResponseModel, error)
      }
  }
    @Post('/getDeliveryTermsById')
    async getDeliveryTermsById(@Body() deliveryTermsReq: DeliveryTermsRequest): Promise<DeliveryTermsResponseModel> {
        try {
            return await this.deliveryTermsService.getActiveDeliveryTermsById(deliveryTermsReq);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(DeliveryTermsResponseModel, err);
        }
    }

    @Post('/getAllDeliveryTermsDropDown')
    async getAllDeliveryTermsDropDown(): Promise<DeliveryTermsDropDownResponseModel> {
        try {
        return await this.deliveryTermsService.getAllDeliveryTermsDropDown();
        } catch (error) {
            return this.applicationExceptionhandler.returnException(DeliveryTermsDropDownResponseModel, error)
        }
    }


}
