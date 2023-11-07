import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { CommonResponseModel,CoBomDto, styleOrderReq } from "@project-management-system/shared-models";


export class CoBomService extends CommonAxiosService{
    URL="/co_bom";

    
    async getBomAgainstItem(req?:styleOrderReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + "/getBomAgainstItem")
    }
}