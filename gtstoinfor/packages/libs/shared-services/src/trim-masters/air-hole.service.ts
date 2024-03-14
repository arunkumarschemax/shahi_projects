import { CategoryIdRequest, CommonResponseModel,AirHoleDTO,} from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class AirHoleService extends CommonAxiosService{
    URL = '/air-holes';
    
    
    async getAllAirHole(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/getAllAirHole')
    }
    
    async createAirHole(req:AirHoleDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/createAirHole',req)
    }

    async  updateAirHole(dto: AirHoleDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/updateAirHole', dto)
    }
    
    async  activateOrDeactivateAirHole(dto: AirHoleDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateAirHole', dto)
    }
    
    async  getAllActiveAirHole(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllActiveAirHole')
    }
    
    async  getAirHoleById(req: AirHoleDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAirHoleById',req)
    }

}