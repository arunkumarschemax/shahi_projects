import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllBuyingHouseResponseModel, BuyingHouseRequest, BuyingHouseDto, BuyingHouseResponseModel } from '@project-management-system/shared-models';


export class BuyingHouseService extends CommonAxiosService{
URL = '/buying-house';

async createBuyingHouse(req: BuyingHouseDto): Promise<BuyingHouseResponseModel> {
    return this.axiosPostCall(this.URL +  '/createBuyingHouse',req)
}

async  updateBuyingHouse(req: BuyingHouseDto): Promise<BuyingHouseResponseModel> {
    return this.axiosPostCall(this.URL + '/updateBuyingHouse', req)
}
        
async getAllBuyingHouse(): Promise<AllBuyingHouseResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllBuyingHouse")
}
        
async  activateOrDeactivateBuyingHouse(req: BuyingHouseRequest): Promise<BuyingHouseResponseModel> {
    return this.axiosPostCall(this.URL + '/activateOrDeactivateBuyingHouse', req)
}
        
async  getAllActiveBuyingHouse(): Promise<AllBuyingHouseResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveBuyingHouse')
}
        
async getActiveBuyingHouseById(req : BuyingHouseRequest): Promise<BuyingHouseResponseModel> {
    return this.axiosPostCall(this.URL + '/getActiveBuyingHouseById',req)
}
        

}