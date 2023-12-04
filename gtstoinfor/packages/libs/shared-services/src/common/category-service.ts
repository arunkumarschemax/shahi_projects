import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { AllColourResponseModel,ColourResponseModel,CommissionResponseModel,ColourDto,ColourRequestDto, CommonResponseModel, CategoryReq, CategoryActivateReq } from "@project-management-system/shared-models";
export class CategoryService extends CommonAxiosService{

    URL ="/category";

    async createCategory(colour: CategoryReq): Promise<CommonResponseModel> {
        console.log('testss',colour)
        return this.axiosPostCall(this.URL + "/createCategory", colour)
    }
  
    async updateCategory(color: CategoryReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/updateCategory", color)
    }
    
    async getAllCategory(): Promise<CommonResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllCategory')
          }

    async activeteOrDeactivateCategory(  req: CategoryActivateReq): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL + '/activeteOrDeactivateCategory', req)
        
          } 
      
     async getAllActiveCategory(): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveCategory')
          }

          async getColourById(): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL + '/getColourById')
          }    

          async getActiveCategory(): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveColour')
          }
}
