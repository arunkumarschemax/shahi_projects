import { AllProfitCenterResponseModel,ProfitCenterDto,ProfitCenterResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";


export class ProfitCenterService extends CommonAxiosService{

    URL ="/profitcenter";

    async createProfitCenter(profitcenter: ProfitCenterDto): Promise<ProfitCenterResponseModel> {
        console.log('testss',profitcenter)
        return this.axiosPostCall(this.URL + "/createProfitCenter", profitcenter)
    }
  
    async updateProfitCenter(profitcenter: ProfitCenterDto): Promise<ProfitCenterResponseModel> {
        return this.axiosPostCall(this.URL + "/updateProfitCenter", profitcenter)
    }
    async getAllProfitCenter(): Promise<ProfitCenterResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllProfitCenter')
          }
    async activateDeActivateProfitCenter(  profitcenter: ProfitCenterDto): Promise<ProfitCenterResponseModel> {
            return this.axiosPostCall(this.URL + '/activeteOrDeactivateProfitCenter', profitcenter)
        
          } 
      
     async getAllActiveProfitCenter(): Promise<ProfitCenterResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveProfitCenter')
          }

          async getProfitCenterById(): Promise<ProfitCenterResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveProfitCenterById')
          }    

          async getActiveProfitCenter(): Promise<ProfitCenterResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveProfitCenter')
          }
}
