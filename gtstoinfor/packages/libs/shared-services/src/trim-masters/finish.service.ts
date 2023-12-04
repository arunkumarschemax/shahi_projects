import { CommonResponseModel, FinishDTO } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class FinishService extends CommonAxiosService{
    URL = '/finish';
    
    
    async getAllFinish(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/getAllFinish')
    }
    
    async createFinish(req:FinishDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/createFinish',req)
    }

    async  updateFinish(dto: FinishDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/updateFinish', dto)
    }
    
    async  activateOrDeactivateFinish(dto: FinishDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateFinish', dto)
    }
    
    async  getAllActiveFinish(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllActiveFinish')
    }
    
    async  getFinishById(req: FinishDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getFinishById',req)
    }
}