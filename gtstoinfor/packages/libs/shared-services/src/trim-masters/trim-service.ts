import { AllTrimResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
export class TrimService extends CommonAxiosService{

    URL ="/trim";

    
    async getAllTrim(): Promise<AllTrimResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllTrim')
          }
      
     async getAllActiveTrim(): Promise<AllTrimResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveTrim')
          }

}
