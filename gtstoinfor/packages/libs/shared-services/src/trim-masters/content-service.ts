import {
    AllTrimResponseModel,
    CommonResponseModel,
    TrimDtos,
  } from "@project-management-system/shared-models";
  import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
  export class ContentService extends CommonAxiosService {
    URL = "/content";
  
    async createContent(req:any): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/createContent", req);
    }
  
    async updateContent(req: any): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/updateContent", req);
    }
  
    async getAllContent(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllContent");
    }
  
    async getAllActiveContent(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveContent");
    }
  
    async activateOrDeactivateContent(req: any): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/activateOrDeactivateContent", req);
    }
  
    async getFabricContentData(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getFabricContentData");
    }
  

  }
  