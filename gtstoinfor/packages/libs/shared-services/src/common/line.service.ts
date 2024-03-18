import { CategoryIdRequest, CommonResponseModel, LineDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class LineService extends CommonAxiosService{
      URL = '/line';

    async createLine(req: LineDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/createLine",req)
    }

    async updateLine(req: LineDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/updateLine",req)
    }
  
    async getAllLine(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllLine")
    }

    async getAllActiveLines(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveLines")
    }

    async  activateOrDeactivateLine(dto: LineDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + '/activateOrDeactivateLine', dto)
  }
  async  getLineById(req: LineDto): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + '/getLineById',req)
}

async getAllTrimLineForCategory(req:CategoryIdRequest):Promise<CommonResponseModel>{
  return this.axiosPostCall(this.URL + '/getAllTrimLineForCategory',req)
}


}