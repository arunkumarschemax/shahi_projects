import { CategoryIdRequest, CommonResponseModel, FunctionDTO,} from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class FunctionService extends CommonAxiosService{
    URL = '/function';
    
    
    async getAllFunction(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/getAllFunction')
    }
    
    async createFunction(req:FunctionDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL +  '/createFunction',req)
    }

    async  updateFunction(dto: FunctionDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/updateFunction', dto)
    }
    
    async  activateOrDeactivateFunction(dto: FunctionDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateFunction', dto)
    }
    
    async  getAllActiveFunction(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllActiveFunction')
    }
    
    async  getFunctionById(req: FunctionDTO): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getFunctionById',req)
    }

}