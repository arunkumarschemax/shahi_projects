import { AllPaymentMethodResponseModel,PaymentMethodDto,PaymentMethodResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";

export class PaymentMethodService extends CommonAxiosService{
    URL ="/paymentmethods";

    async createPaymentMethod(Payment: PaymentMethodDto): Promise<PaymentMethodResponseModel> {
       // console.log('testss',Payment)
        return this.axiosPostCall(this.URL + "/createPaymentMethod", Payment)
    }

    async updatePaymentMethod(Payment: PaymentMethodDto): Promise<PaymentMethodResponseModel> {
        return this.axiosPostCall(this.URL + "/updatePaymentMethod", Payment)
      }


      async getAllPaymentMethods(): Promise<PaymentMethodResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllPaymentMethods')
      }

      async activateDeActivatePaymentMethod(  Payment: PaymentMethodDto): Promise<PaymentMethodResponseModel> {
        return this.axiosPostCall(this.URL + '/activeteOrDeactivateMethod', Payment)
    
      }
      async getAllActiveMethod(): Promise<PaymentMethodResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllActivePaymentMethod')
      }
      async getPaymentById(): Promise<PaymentMethodResponseModel> {
        return this.axiosPostCall(this.URL + '/getPaymentMethodById')
      }
      async getActivePaymentMethod(): Promise<PaymentMethodResponseModel> {
        return this.axiosPostCall(this.URL + '/getActivePaymentMethodCount')
      }
}
