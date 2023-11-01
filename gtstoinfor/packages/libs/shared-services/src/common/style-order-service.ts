import {  CoUpdateReq, CoUpdateResponseModel, CommonResponseModel, StyleOrderIdReq, StyleOrderReq, StyleOrderResponseModel, VariantIdReq, styleOrderReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class StyleOrderService extends CommonAxiosService{
    URL = '/styleOrder';
    
    async createCustomerOrder(req :StyleOrderReq): Promise<StyleOrderResponseModel>{
        return this.axiosPostCall(this.URL + '/createCustomerOrder',req)
    }
    async getAllStyleOrdersByItem(req:styleOrderReq): Promise<any>{
        return this.axiosPostCall(this.URL + '/getAllStyleOrdersByItem',req)
    }
    async getAllCoLinesById(req:styleOrderReq): Promise<any>{
        return this.axiosPostCall(this.URL + '/getAllCoLinesById',req)
    }
    async cancelOrder(req:StyleOrderIdReq): Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/cancelOrder',req)
    }
    async cancelVariantOrder(req:VariantIdReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/cancelVariantOrder',req)
    }
    async getCOInfoById(req:StyleOrderIdReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/getCOInfoById',req)
    }
    async getCoLineItemsByDestination(req:StyleOrderIdReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/getCoLineItemsByDestination',req)
    }

    async getCoNumber():Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/getCoNumber')
    }

    async getCoDataByCoId(req:StyleOrderIdReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/getCoDataByCoId',req)
    }

    async updateCoData(req:CoUpdateReq):Promise<CoUpdateResponseModel>{
        return this.axiosPostCall(this.URL + '/updateCoData',req)
    }


}