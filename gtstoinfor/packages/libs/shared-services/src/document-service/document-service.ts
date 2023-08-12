import axios, { AxiosRequestConfig } from "axios";
import {DocumentResponseModel} from '../../../shared-models/src/document-management/document-response.model'
import {DeleteDto} from '../../../shared-models/src/document-management/delete-dto'
import { DocumentReqDto } from "@project-management-system/shared-models";
export default class DocumentService { 
  
  private url = "/doc-upload";
  
  async create(documentDto: DocumentReqDto, config?: AxiosRequestConfig): Promise<DocumentResponseModel> {
    return this.axiosPostCall(this.url + "/createDocument", documentDto)
  }



  async getAllDocuments(): Promise<DocumentResponseModel> {
    return this.axiosPostCall(this.url + "/getAllDocuments", )
  }
  
  async activateOrDeactivateDocument(
    payload: DeleteDto): Promise<DocumentResponseModel> {
    return this.axiosPostCall(
      this.url + "activateOrDeactivateDocument",payload)
    .then(res => {
      if (res.data) {
        return res.data;
      } else {
        throw new Error('Failed to activate or deactivate ');
      }
    })
    .catch(error => {
      throw error;
    });
  }

  
}