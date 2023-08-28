import { CommonResponseModel, DocumentDto, DocumentResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class DocumentService extends CommonAxiosService {
  private url = "/doc-upload";

  async getAllDocuments(): Promise<DocumentResponseModel> {
      return this.axiosPostCall(this.url + "/getAllDocuments")
      // .then(res => {
      //   return res
      // })
  }

  async createDocument(dto:DocumentDto): Promise<DocumentResponseModel> {
    return this.axiosPostCall(this.url + "/createDocument",dto)
  }
  async updateDocument(dto:DocumentDto): Promise<DocumentResponseModel> {
    return this.axiosPostCall(this.url + "/updateDocument",dto)
  }
  async activateOrDeactivateDocument(dto:DocumentDto): Promise<DocumentResponseModel> {
    return this.axiosPostCall(this.url + "/activateOrDeactivateDocument",dto)
  }
  
  async getAllDocumentsforRolemapping(): Promise<DocumentResponseModel> {
    return this.axiosPostCall(this.url + "/getAllDocumentsforRolemapping")
}
  
async getDocumentsNotMapped(): Promise<DocumentResponseModel> {
  return this.axiosPostCall(this.url + "/getDocumentsNotMapped")
}

async updatePriority(req:DocumentDto):Promise<CommonResponseModel>{
  return this.axiosPostCall(this.url + "/updatePriority", req)
}

}