import { CommonResponseModel, ProductStructureResponseModel, SMVEfficiencyRequest } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class productStructureService extends CommonAxiosService{
URL = '/product-structure';


async createSMVEfficency( req: SMVEfficiencyRequest): Promise<ProductStructureResponseModel> {
    return this.axiosPostCall(this.URL +  '/createSMVEfficency', req)
}

async getRmMapped(req:any): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getRmMapped",req)
  }


}