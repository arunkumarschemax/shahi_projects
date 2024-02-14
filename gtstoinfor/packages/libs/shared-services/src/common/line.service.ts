import { CommissionResponseModel, LineDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class LineService extends CommonAxiosService{
      URL = '/line';

    async createLine(req: LineDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/createLine",req)
    }

    async updateLine(req: LineDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/updateLine",req)
    }
  
    async getAllLine(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllLine")
    }

    async getAllActiveLines(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveLines")
    }
}