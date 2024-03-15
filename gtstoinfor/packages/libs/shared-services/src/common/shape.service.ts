import { CommissionResponseModel, CommonResponseModel, ShapeDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class ShapeService extends CommonAxiosService{
      URL = '/shape';

    async createShape(req: ShapeDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/createShape",req)
    }

    async updateShape(req: ShapeDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/updateShape",req)
    }
  
    async getAllShapes(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllShapes")
    }

    async getAllActiveShape(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveShape")
    }

    async  activateOrDeactivateShape(dto: ShapeDto): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + '/activateOrDeactivateShape', dto)
  }
  async  getShapeById(req: ShapeDto): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + '/getShapeById',req)
}

}