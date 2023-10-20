import { CommonResponseModel, ItemCodeReq, ItemSKusReq, SKUGenerationReq, SKUGenerationResponseModel, SKUlistFilterRequest } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class SKUGenerationService extends CommonAxiosService{
    URL ="/itemSkus";

    async skuGeneration(req: ItemSKusReq): Promise<SKUGenerationResponseModel> {
        return this.axiosPostCall(this.URL + "/createItemSku", req)
    } 

    async getDestinationsByItem(req: ItemCodeReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getDestinationsByItem", req)
    } 

    async getDataByDestinationAgainstItem(req: ItemCodeReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getDataByDestinationAgainstItem", req)
    } 

    async getDataByItem(req: ItemCodeReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getDataByItem", req)
    } 

    async getSkuList(req:SKUlistFilterRequest):Promise<CommonResponseModel>{
        console.log(req,'tttttttttttt')
        return this.axiosPostCall(this.URL +"/getSkuList",req)
    }
    async getAllitemsCode ():Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL +"/getAllitemsCode")
    }

    async closeSKUById(req :ItemSKusReq): Promise<any>{
        return this.axiosPostCall(this.URL + '/closeSKUById')
    }
}