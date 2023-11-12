import {  CoLineIdReq, CoUpdateReq, CoUpdateResponseModel, CommonResponseModel, StyleOrderIdReq, StyleOrderReq, StyleOrderResponseModel, VariantIdReq, styleOrderReq } from "@project-management-system/shared-models";
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

    async getCoLineDataById(req:StyleOrderIdReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/getCoLineDataById',req)
    }

    async updateCoData(req:CoUpdateReq):Promise<CoUpdateResponseModel>{
        return this.axiosPostCall(this.URL + '/updateCoData',req)
    }

    async  getCoamendment ():Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL +'/getCoamendment')
    }

    async  getConumber ():Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL +'/getConumber')
    }
    async  getDestinationInOrderLines ():Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL +'/getDestinationInOrderLines')
    }
    async getCoLineInfoById(req:StyleOrderIdReq):Promise<CommonResponseModel>{
        return this.axiosPostCall(this.URL + '/getCoLineInfoById',req)
    }
}