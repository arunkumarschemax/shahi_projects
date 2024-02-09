import { CommissionResponseModel, SliderDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class SliderService extends CommonAxiosService{
      URL = '/slider';

    async createSlider(req: SliderDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/createSlider",req)
    }

    async updateSlider(req: SliderDto): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/updateSlider",req)
    }
  
    async getAllSliders(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllSliders")
    }

    async getAllActiveSliders(): Promise<CommissionResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveSliders")
    }
}