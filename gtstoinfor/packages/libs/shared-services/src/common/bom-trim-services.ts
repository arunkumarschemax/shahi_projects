import { CommonAxiosService } from "../common-axios-service-prs";
import { BomRequest, BomTrimResponseModel } from '@project-management-system/shared-models';


export class bomTrimService extends CommonAxiosService{
URL = '/bomTrim';


async createBomTrim( dto: BomRequest): Promise<BomTrimResponseModel> {
    return this.axiosPostCall(this.URL +  '/createBomTrim',dto)
}



}