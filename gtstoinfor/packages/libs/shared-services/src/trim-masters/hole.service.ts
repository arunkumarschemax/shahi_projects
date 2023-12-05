import { CommonResponseModel, HoleDTO } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class HoleService extends CommonAxiosService{
    URL = '/hole';
    
    
    async getAllHoles(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/getAllHoles')
    }
    
    async createHole(req:HoleDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/createHole',req)
    }

    async  updateHole(dto: HoleDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/updateHole', dto)
    }
    
    async  activateOrDeactivateHole(dto: HoleDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateHole', dto)
    }
    
    async  getAllActiveHole(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllActiveHole')
    }
    
    async  getHoleById(req: HoleDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getHoleById',req)
    }
}