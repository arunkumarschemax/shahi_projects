import { CommissionResponseModel, ShapeDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class ShapeService extends CommonAxiosService{
      URL = '/shape';

    async createShape(req: ShapeDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/createShape",req)
    }

    async updateShape(req: ShapeDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/updateShape",req)
    }
  
    async getAllShapes(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllShapes")
    }

    async getAllActiveShape(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveShape")
    }
}