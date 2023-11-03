import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { AllColourResponseModel,ColourResponseModel,CommissionResponseModel,ColourDto,ColourRequestDto, DivisionRequest, ColourDropDownResponse } from "@project-management-system/shared-models";
export class ColourService extends CommonAxiosService{

    URL ="/colurs";

    async createColour(colour: ColourDto): Promise<ColourResponseModel> {
        // console.log('testss',colour)
        return this.axiosPostCall(this.URL + "/createColour", colour)
    }
  
    async updateColour(color: ColourDto): Promise<ColourResponseModel> {
        return this.axiosPostCall(this.URL + "/updateColour", color)
    }
    
    async getAllColour(): Promise<ColourResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllColour')
          }

    async activeteOrDeactivateColour(  color: ColourDto): Promise<ColourResponseModel> {
            return this.axiosPostCall(this.URL + '/activeteOrDeactivateColour', color)
        
          } 
      
     async getAllActiveColour(): Promise<ColourResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveColour')
          }

          async getColourById(): Promise<ColourResponseModel> {
            return this.axiosPostCall(this.URL + '/getColourById')
          }    

          async getActiveColour(): Promise<ColourResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveColour')
          }
          async getColourforDivisionDropDown(req:DivisionRequest): Promise<ColourDropDownResponse> {
            return this.axiosPostCall(this.URL + '/getColourforDivisionDropDown',req)
      
}
}
