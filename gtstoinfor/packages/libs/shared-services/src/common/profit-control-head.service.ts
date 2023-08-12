import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { AllProfitControlHeadResponseModel,ProfitControlHeadResponseModel,ProfitControlHeadDto,ProfitControlHeadRequestDto } from "@project-management-system/shared-models";

export class ProfitControlHeadService extends CommonAxiosService{

    URL ="/profitcontrolhead";

    async createProfitControlHead(profitcontrol: ProfitControlHeadDto): Promise<ProfitControlHeadResponseModel> {
        console.log('testss',profitcontrol)
        return this.axiosPostCall(this.URL + "/createProfitControlHead", profitcontrol)
    }
  
    async updateProfitContralHead(profitcontrol: ProfitControlHeadDto): Promise<ProfitControlHeadResponseModel> {
        return this.axiosPostCall(this.URL + "/updateProfitContralHead", profitcontrol)
    }
    
    async getAllProfitControlHead(): Promise<ProfitControlHeadResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllProfitControlHead')
          }

    async activeteOrDeactivateProfitControlHead(  profitcontrol: ProfitControlHeadDto): Promise<ProfitControlHeadResponseModel> {
            return this.axiosPostCall(this.URL + '/activeteOrDeactivateProfitControlHead', profitcontrol)
        
          } 
      
     async getAllActiveProfitControlHead(): Promise<ProfitControlHeadResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveProfitControlHead')
          }

          async getProfitControlHeadById(): Promise<ProfitControlHeadResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveProfitCenterById')
          }    

          async getActiveProfitControlHead(): Promise<ProfitControlHeadResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveProfitCenter')
          }
}
