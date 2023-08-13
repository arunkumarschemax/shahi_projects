import axios, { AxiosRequestConfig } from "axios";
import {DocumentResponseModel} from '../../../shared-models/src/document-management/document-response.model'
import { DocumentDto } from "@project-management-system/shared-models";
import {DeleteDto} from '../../../shared-models/src/document-management/delete-dto'
import { CommonAxiosService } from "../common-axios-service-prs";
export default class DocumentSharedService extends CommonAxiosService{ 
  private url = "/doc-upload";
  
  // async createForm(formdataDto: DocumentDto, config?: AxiosRequestConfig): Promise<DocumentResponseModel> {
  //   return await axios.post("http://localhost:5000/documentdata/createDocument",
  //     formdataDto,
  //     config
  //   );
  // }
  async createForm(formdataDto: DocumentDto): Promise<DocumentResponseModel> {
    return this.axiosPostCall(this.url + "/createForm",formdataDto)
}
  // async getAllDocuments(): Promise<DocumentResponseModel> {
  //   console.log('like')
  //   return await axios.post("http://localhost:5000/documentdata/getAllDocuments");
  // }


  async getAllDocuments(): Promise<DocumentResponseModel> {
    return this.axiosPostCall(this.url + "/getAllDocumentDetails")
}



  async activateOrDeactivateDocument(
    formdataDto: DeleteDto,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return await axios.post(
      "http://localhost:5000/documentdata/activateOrDeactivateDocument",
      formdataDto,
      config
    );
  }

  
}