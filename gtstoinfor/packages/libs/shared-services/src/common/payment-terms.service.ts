import { CommonAxiosService } from "../common-axios-service-prs";
import { AllPaymentTermsResponseModel, PaymentTermsDropDownResponseModel, PaymentTermsDto, PaymentTermsRequest, PaymentTermsResponseModel } from "@project-management-system/shared-models";
import { UserRequestDto } from "../user-request";

export class PaymentTermsService extends CommonAxiosService {
    URL = "/payment-terms";

    async createPaymentTerms(dto: PaymentTermsDto): Promise<PaymentTermsResponseModel> {
       console.log(dto,"777777");
       return this.axiosPostCall(this.URL + '/createPaymentTerms',dto)
    }


    async  updatePaymentTerms(dto: PaymentTermsDto): Promise<PaymentTermsResponseModel> {
        return this.axiosPostCall(this.URL + '/updatePaymentTerms', dto)
     }


    async  activateOrDeactivatePaymentTerms(Dto: PaymentTermsDto): Promise<PaymentTermsResponseModel> {
        console.log(Dto ,"front activate")
         return this.axiosPostCall(this.URL + '/activateOrDeactivatePaymentTerms', Dto)
                    
     }


     async getAllPaymentTerms(req?:UserRequestDto): Promise<AllPaymentTermsResponseModel> {
        console.log('uuuuuuu')
        return this.axiosPostCall(this.URL + '/getAllPaymentTerms',req)
                     
        }

    async getAllpaymentTermsDropDown(): Promise<PaymentTermsDropDownResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllpaymentTermsDropDown')
            
    }

    async getAllVendorPaymentTermsDropDown(): Promise<PaymentTermsDropDownResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllVendorPaymentTermsDropDown');
    }

    async getPaymentById(paymentTermsRequest:PaymentTermsRequest): Promise<PaymentTermsResponseModel> {
        return this.axiosPostCall(this.URL + '/getPaymentById',paymentTermsRequest);
    }
}