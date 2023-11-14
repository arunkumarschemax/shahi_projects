import { CommonAxiosService } from "../common-axios-service-prs";
import { BomTrimResponseModel, bomRequest } from '@project-management-system/shared-models';


export class bomTrimService extends CommonAxiosService{
URL = '/bomTrim';


async createBomTrim( dto: bomRequest): Promise<BomTrimResponseModel> {
    return this.axiosPostCall(this.URL +  '/createBomTrim',dto)
}



}