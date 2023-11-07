import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { CommonResponseModel,CoBomDto, StyleOrderIdReq, StyleOrderid, styleOrderReq } from "@project-management-system/shared-models";


export class CoBomService extends CommonAxiosService{
    URL="/co_bom";

    async getDataForMOPById(req?:StyleOrderid): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getDataForMOPById",req)
      }

    
    async getBomAgainstItem(req?:styleOrderReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + "/getBomAgainstItem")
    }
}