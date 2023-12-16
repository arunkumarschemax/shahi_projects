import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { AllColourResponseModel,ColourResponseModel,CommissionResponseModel,ColourDto,ColourRequestDto, CommonResponseModel, CategoryReq, CategoryActivateReq, WeightReq, WeightActivateReq } from "@project-management-system/shared-models";
export class WeightService extends CommonAxiosService{

    URL ="/weight";

    async createWeight(weight: WeightReq): Promise<CommonResponseModel> {
        console.log('testss',weight)
        return this.axiosPostCall(this.URL + "/createWeight", weight)
    }
  
    async updateWeight(weight: WeightReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/updateWeight", weight)
    }
    
    async getAllActiveWeight(): Promise<CommonResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllActiveWeight')
          }

    async activeteOrDeactivateWeight(  req: WeightActivateReq): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL + '/activeteOrDeactivateWeight', req)
        
          } 
       

          async getAllWeight(): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllWeight')
          }
}
