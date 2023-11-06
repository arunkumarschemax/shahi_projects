import { FgRmMappingRequest, FgRmMappingResponseModel, CommonResponseModel, FgItemCodeReq, ProductStructureResponseModel, SMVEfficiencyRequest } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class ProductStructureService extends CommonAxiosService{
URL = '/product-structure';


async createSMVEfficency( req: SMVEfficiencyRequest): Promise<ProductStructureResponseModel> {
    return this.axiosPostCall(this.URL +  '/createSMVEfficency', req)
}

async createFgRmMapping( req: FgRmMappingRequest): Promise<FgRmMappingResponseModel> {
    return this.axiosPostCall(this.URL +  '/createFgRmMapping', req)
}


async getAllInfoByItemCode( req: FgItemCodeReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL +  '/getAllInfoByItemCode', req)
}

async getRmMapped(req:any): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getRmMapped",req)
  }

  async getAllSmvData(req:any): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllSmvData",req)
  }


}