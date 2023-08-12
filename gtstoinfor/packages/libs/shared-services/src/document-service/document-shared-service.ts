import axios, { AxiosRequestConfig } from "axios";
import {DocumentResponseModel} from '../../../shared-models/src/document-management/document-response.model'
import { DocumentDto } from "@project-management-system/shared-models";
import {DeleteDto} from '../../../shared-models/src/document-management/delete-dto'
export default class DocumentSharedService { 
  
  async createForm(formdataDto: DocumentDto, config?: AxiosRequestConfig): Promise<DocumentResponseModel> {
    console.log(formdataDto, "cccc");
    return await axios.post("http://localhost:5000/documentdata/createDocument",
      formdataDto,
      config
    );
  }
  
  async getAllDocuments(): Promise<DocumentResponseModel> {
    console.log('like')
    return await axios.post("http://localhost:5000/documentdata/getAllDocuments");
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