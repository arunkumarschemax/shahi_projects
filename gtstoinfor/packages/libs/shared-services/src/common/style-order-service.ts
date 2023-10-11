import { StyleOrderReq, StyleOrderResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class StyleOrderService extends CommonAxiosService{
    URL = '/styleOrder';
    
    async createCustomerOrder(req :StyleOrderReq): Promise<StyleOrderResponseModel>{
        return this.axiosPostCall(this.URL + '/createCustomerOrder',req)
    }
    async getAllStyleOrders(): Promise<any>{
        return this.axiosPostCall(this.URL + '/getAllStyleOrders')
    }
}