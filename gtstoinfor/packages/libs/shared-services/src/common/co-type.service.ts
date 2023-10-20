import { CoTypeResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class CoTypeService extends CommonAxiosService{
      URL = '/co-types';
  
      async getAllCoTypeInfo(): Promise<CoTypeResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllCoTypeInfo")
      }
    }