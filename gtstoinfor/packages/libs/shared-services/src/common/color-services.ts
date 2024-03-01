import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class ColorService extends CommonAxiosService {
    private URL = "/color";

    async saveColorInfo(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/saveColorInfo", req)
    }

    async getColorInfo(req:any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getColorInfo",req)
    }
    
    
    async getDistinctPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getDistinctPoNumber")
    }  
}