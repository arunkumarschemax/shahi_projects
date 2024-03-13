import { CategoryIdRequest, CommonResponseModel, TrimUomDTO } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class TrimUomService extends CommonAxiosService{
    URL = '/trim-uom';
    
    
    async getAllTrimUom(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/getAllTrimUom')
    }
    
    async createTrimUom(req:TrimUomDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/createTrimUom',req)
    }

    async  updateTrimUom(dto: TrimUomDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/updateTrimUom', dto)
    }
    
    async  activateOrDeactivateTrimUom(dto: TrimUomDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateTrimUom', dto)
    }
    
    async  getAllActiveTrimUom(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllActiveTrimUom')
    }
    
    async  getTrimUomById(req: TrimUomDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getTrimUomById',req)
    }

    // async  getAllHolesForCategory(req: CategoryIdRequest): Promise<CommonResponseModel> {
    //     return this.axiosPostCall(this.URL + '/getAllHolesForCategory',req)
    // }

}