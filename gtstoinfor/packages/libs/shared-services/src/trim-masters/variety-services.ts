import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import {AllVarietysResponseModel } from "@project-management-system/shared-models";
export class VarietyService extends CommonAxiosService{

    URL ="/variety";

    
    async getAllVariety(): Promise<AllVarietysResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllVariety')
          }
      
     async getAllActiveVariety(): Promise<AllVarietysResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveVariety')
          }

}
