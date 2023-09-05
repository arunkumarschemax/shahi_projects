import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { AllFabricsResponseModel,FabricsResponseModel,FabricsDto,FabricsRequestDto } from "@project-management-system/shared-models";

export class FabricsService extends CommonAxiosService{

    URL ="/fabrics_Name";

    async createFabrics(fab: FabricsDto): Promise<FabricsResponseModel> {
        console.log('testss',fab)
        return this.axiosPostCall(this.URL + "/createFabrics", fab)
    }
  
    async updateFabrics(update: FabricsDto): Promise<FabricsResponseModel> {
        return this.axiosPostCall(this.URL + "/updateFabrics", update)
    }
    
    async getAllFabrics(): Promise<FabricsResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllFabrics')
          }

    async activeteOrDeactivateFabrics(  fabric: FabricsDto): Promise<FabricsResponseModel> {
            return this.axiosPostCall(this.URL + '/activeteOrDeactivateFabrics', fabric)
        
          } 
      
     async getAllActiveFabrics(): Promise<FabricsResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveFabrics')
          }

          async getFabricsById(): Promise<FabricsResponseModel> {
            return this.axiosPostCall(this.URL + '/getFabricsById')
          }    

          async getActiveFabrics(): Promise<FabricsResponseModel>{
            return this.axiosPostCall(this.URL + '/getActiveFabrics')
          }
}
