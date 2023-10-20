import { BusinessAreaResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class BusinessAreaService extends CommonAxiosService{
      URL = '/business-area';
  
      async getAllBusinessAreaInfo(): Promise<BusinessAreaResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllBusinessAreaInfo")
      }
    }