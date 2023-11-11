import { CoLineReq, CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class CoLineService extends CommonAxiosService{
    URL = '/coline';
    
    async createCoLine(req :CoLineReq): Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/createCoLine',req)
    }
}