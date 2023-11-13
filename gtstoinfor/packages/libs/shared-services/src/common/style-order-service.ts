import { StyleOrderReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class StyleOrderService extends CommonAxiosService{
    URL = '/styleOrder';
    
    async createCustomerOrder(req :StyleOrderReq): Promise<any>{
        return this.axiosPostCall(this.URL + '/createCustomerOrder',req)
    }
}