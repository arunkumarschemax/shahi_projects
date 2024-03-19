import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
export class ArticleService extends CommonAxiosService {
    URL = "/article";
  
    async createArticles(req:any): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/createArticles", req);
    }
  
    async updateArticles(req: any): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/updateArticles", req);
    }
  
    async getAllArticles(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllArticles");
    }
  
    async getAllActiveArticles(): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/getAllActiveArticles");
    }
  
    async activateOrDeactivateArticle(req: any): Promise<CommonResponseModel> {
      return this.axiosPostCall(this.URL + "/activateOrDeactivateArticle", req);
    }

  }
  