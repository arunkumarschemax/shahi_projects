import { AllBuyersResponseModel, BuyerRequest, BuyersDto, BuyersGeneralAttributeModel, BuyersGeneralAttributeRequest, BuyersGeneralAttributeResponseModel, BuyersResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class BuyersService extends CommonAxiosService{
  activatedeActivate(buyersData: BuyersDto) {
    throw new Error('Method not implemented.');
  }
    URL = '/buyers';

    async createBuyer(req: BuyersDto): Promise<BuyersResponseModel> {
    return this.axiosPostCall(this.URL + "/createBuyer", req)
    }

    async updateBuyer(req: BuyersDto): Promise<BuyersResponseModel> {
        return this.axiosPostCall(this.URL + "/updateBuyer", req)
    }

    async getAllBuyer(): Promise<AllBuyersResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllBuyer")
    }

    async getAllActiveBuyers(): Promise<AllBuyersResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllActiveBuyers")
    }

    async getBuyerDataById(req:BuyerRequest): Promise<BuyersResponseModel> {
        return this.axiosPostCall(this.URL + "/getBuyerDataById",req)
    }

    async activateOrDeactivateBuyer(req:BuyerRequest): Promise<BuyersResponseModel> {
        return this.axiosPostCall(this.URL + "/activateOrDeactivateBuyer",req)
    }

    async createGeneralAttribute(req:BuyersGeneralAttributeRequest): Promise<BuyersGeneralAttributeResponseModel> {
        return this.axiosPostCall(this.URL + "/createGeneralAttribute",req)
    }

    async updateGeneralAttribute(req:BuyersGeneralAttributeRequest): Promise<BuyersGeneralAttributeResponseModel> {
        return this.axiosPostCall(this.URL + "/updateGeneralAttribute",req)
    }

    async getByBuyerId(req:BuyerRequest): Promise<BuyersGeneralAttributeResponseModel> {
        return this.axiosPostCall(this.URL + "/getByBuyerId",req)
    }

    

}
