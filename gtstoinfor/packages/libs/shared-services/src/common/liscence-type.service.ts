import axios from 'axios';
import { AllDeliveryResponseModel, DeliveryMethodDto, DeliveryMethodRequest, DeliveryMethodResponseModel } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllLiscenceResponseModel, LiscenceTypeIdRequest, LiscenceTypeResponseModel, LiscenceTypesdDto } from '@project-management-system/shared-models';


export class LiscenceTypeService extends CommonAxiosService{
URL = '/liscenc-type';

        async createLiscenceType(liscenceType: LiscenceTypesdDto): Promise<LiscenceTypeResponseModel> {
            return this.axiosPostCall(this.URL +  '/createLiscenceType',liscenceType)
                
        }

        async  updateLiscenceType(liscenceType: LiscenceTypesdDto): Promise<LiscenceTypeResponseModel> {
            return this.axiosPostCall(this.URL + '/updateLiscenceType', liscenceType)
        }

       async getAllLiscenceTypes(): Promise<AllLiscenceResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllLiscenceTypes")
        
      }
            async  activateOrDeactivateLiscenceType(liscenceType: LiscenceTypesdDto): Promise<LiscenceTypeResponseModel> {
                return this.axiosPostCall(this.URL + '/activateOrDeactivateLiscenceType', liscenceType)
             
            }

           

            async getActiveLiscenceTypeById(liscenceTypeReq : LiscenceTypeIdRequest): Promise<DeliveryMethodResponseModel> {
                return this.axiosPostCall(this.URL + '/getActiveLiscenceTypeById',liscenceTypeReq)
              }

            // async getActiveDeliveryMethodsCount(): Promise<AllDeliveryResponseModel> {
            //     return this.axiosPostCall(this.URL + '/getActiveDeliveryMethodsCount').then(res => {
            //     return res.data
            // });
            // }

            // async getDeliveryById(deliveryTermsRequest:PaymentTermsDto): Promise<DeliveryMethodsResponseModel> {
            //     return await axios.post(this.URL + '/getPaymentById',paymentTermsRequest).then(res => {
            //         return res.data
            //     });
            // }

    async getAllActiveLiscenceTypes(): Promise<AllLiscenceResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllActiveLiscenceTypes")
        
    }

}