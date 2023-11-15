import axios from 'axios';
import { AllDeliveryResponseModel, DeliveryMethodDto, DeliveryMethodRequest, DeliveryMethodResponseModel } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";


export class DeliveryMethodService extends CommonAxiosService{
URL = '/delivery-method';

        async createDeliveryMethod(deliveryMethod: DeliveryMethodDto): Promise<DeliveryMethodResponseModel> {
            // console.log(deliveryMethod,'avadam ledhu')
            return this.axiosPostCall(this.URL +  '/createDeliveryMethod',deliveryMethod)
                
        }

        async  updateDeliveryMethod(deliveryMethod: DeliveryMethodDto): Promise<DeliveryMethodResponseModel> {
            return this.axiosPostCall(this.URL + '/updateDeliveryMethod', deliveryMethod)
        }

            async getAllDeliveryMethods(): Promise<AllDeliveryResponseModel> {
                return this.axiosPostCall(this.URL + "/getAllDeliveryMethods")
    
            }
            async  activateOrDeactivateDeliveryMethod(deliveryMethodDto: DeliveryMethodDto): Promise<DeliveryMethodResponseModel> {
                return this.axiosPostCall(this.URL + '/activateOrDeactivateDeliveryMethod', deliveryMethodDto)
             
            }

            async  getAllActiveDeliveryMethods(): Promise<AllDeliveryResponseModel> {
                return this.axiosPostCall(this.URL + '/getAllActiveDeliveryMethods')
            }

            async getDeliveryMethodById(deliveryMethodReq : DeliveryMethodRequest): Promise<DeliveryMethodResponseModel> {
                return this.axiosPostCall(this.URL + '/getDeliveryMethodById',deliveryMethodReq)
              }

            async getActiveDeliveryMethodsCount(): Promise<AllDeliveryResponseModel> {
                return this.axiosPostCall(this.URL + '/getActiveDeliveryMethodsCount').then(res => {
                return res.data
            });
            }
            // async getDeliveryById(deliveryTermsRequest:PaymentTermsDto): Promise<DeliveryMethodsResponseModel> {
            //     return await axios.post(this.URL + '/getPaymentById',paymentTermsRequest).then(res => {
            //         return res.data
            //     });
            // }

}