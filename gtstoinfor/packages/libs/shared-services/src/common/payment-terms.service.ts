import { CommonAxiosService } from "../common-axios-service-prs";
import { AllPaymentTermsResponseModel, PaymentTermsDropDownResponseModel, PaymentTermsDto, PaymentTermsRequest, PaymentTermsResponseModel } from "@project-management-system/shared-models";
import { UserRequestDto } from "../user-request";

export class PaymentTermsService extends CommonAxiosService {
    URL = "/payment-terms";

    async create(dto: PaymentTermsDto): Promise<PaymentTermsResponseModel> {
       console.log(dto);
       return this.axiosPostCall(this.URL + '/createPaymentTerms',dto)
    }


    async  update(dto: PaymentTermsDto): Promise<PaymentTermsResponseModel> {
        return this.axiosPostCall(this.URL + '/updatePaymentTerms', dto)
     }


    async  activatedeActivate(Dto: PaymentTermsDto): Promise<PaymentTermsResponseModel> {
         return this.axiosPostCall(this.URL + '/activateOrDeactivatePaymentTerms', Dto)
                    
     }


     async getAll(req?:UserRequestDto): Promise<AllPaymentTermsResponseModel> {
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