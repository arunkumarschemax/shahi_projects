import { FgRmMappingRequest, FgRmMappingResponseModel, ProductStructureResponseModel, SMVEfficiencyRequest } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class productStructureService extends CommonAxiosService{
URL = '/product-structure';


async createSMVEfficency( req: SMVEfficiencyRequest): Promise<ProductStructureResponseModel> {
    return this.axiosPostCall(this.URL +  '/createSMVEfficency', req)
}

async createFgRmMapping( req: FgRmMappingRequest): Promise<FgRmMappingResponseModel> {
    return this.axiosPostCall(this.URL +  '/createFgRmMapping', req)
}



}