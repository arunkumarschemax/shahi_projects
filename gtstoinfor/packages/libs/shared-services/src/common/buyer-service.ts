import { AllBuyersResponseModel, BuyerIdReq, BuyerRequest, BuyersDto, BuyersGeneralAttributeModel, BuyersGeneralAttributeRequest, BuyersGeneralAttributeResponseModel, BuyersOrderAttributeRequest, BuyersOrderAttributeResponseModel, BuyersResponseModel, CommonResponseModel } from '@project-management-system/shared-models';
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

    async getAllBuyer(req?: BuyerIdReq): Promise<AllBuyersResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllBuyer",req)
    }

    async getAllActiveBuyers(req?: BuyerIdReq): Promise<AllBuyersResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllActiveBuyers",req)
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

    async getAddressByBuyerId(req:BuyerIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAddressByBuyerId",req)
    }

    async getAllBuyersInfo(req?: string): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllBuyersInfo",req)
    }
    
    async createOrderAttribute(req:BuyersOrderAttributeRequest): Promise<BuyersOrderAttributeResponseModel> {
        return this.axiosPostCall(this.URL + "/createOrderAttribute",req)
    }
    
    async updateOrderAttribute(req:BuyersOrderAttributeRequest): Promise<BuyersOrderAttributeResponseModel> {
        return this.axiosPostCall(this.URL + "/updateOrderAttribute",req)
    }

    async getBuyerId(req:BuyerRequest): Promise<BuyersOrderAttributeResponseModel> {
        return this.axiosPostCall(this.URL + "/getBuyerId",req)
    }

    async getAllAddress(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllAddress")
    }
    async getBuyerByRefId(req:string): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getBuyerByRefId",req)
    }
}
