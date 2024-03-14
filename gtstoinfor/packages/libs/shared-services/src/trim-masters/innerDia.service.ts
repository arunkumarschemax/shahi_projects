import {CommonResponseModel,InnerDiaDTO,} from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class InnerDiaService extends CommonAxiosService{
    URL = '/innerDia';
    
    
    async getAllInnerDia(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/getAllInnerDia')
    }
    
    async createInnerDia(req:InnerDiaDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/createInnerDia',req)
    }

    async  updateInnerDia(dto: InnerDiaDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/updateInnerDia', dto)
    }
    
    async  activateOrDeactivateInnerDia(dto: InnerDiaDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateInnerDia', dto)
    }
    
    async  getAllActiveInnerDia(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllActiveInnerDia')
    }
    
    async  getInnerDiaById(req: InnerDiaDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getInnerDiaById',req)
    }

}