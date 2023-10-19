import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { AllSizeResponseModel,SizeResponseModel,SizeDto,SizeRequestDto, DivisionRequest, SizesDropDownResponse } from "@project-management-system/shared-models";
export class SizeService extends CommonAxiosService{

    URL ="/size";

    async createsize(sizes: SizeDto): Promise<SizeResponseModel> {
        console.log('testss',sizes)
        return this.axiosPostCall(this.URL + '/createsize', sizes)
    }
  
    async updateSize(size: SizeDto): Promise<SizeResponseModel> {
        return this.axiosPostCall(this.URL + '/updateSize', size)
    }
    
    async getAllSize(): Promise<SizeResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllSize')
          }

    async activeteOrDeactivateSize(  size: SizeDto): Promise<SizeResponseModel> {
            return this.axiosPostCall(this.URL + '/activeteOrDeactivateSize', size)
        
          } 
      
     async getAllActiveSize(): Promise<SizeResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveSize')
          }

          async getSizeById(): Promise<SizeResponseModel> {
            return this.axiosPostCall(this.URL + '/getSizeById')
          }    

          async getActiveSize(): Promise<SizeResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveSize')
          }

          async getSizesforDivisionDropDown(req:DivisionRequest): Promise<SizesDropDownResponse> {
            return this.axiosPostCall(this.URL + '/getSizesforDivisionDropDown',req)
      
}
}