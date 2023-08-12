import axios, { AxiosRequestConfig } from "axios";
import {DocumentResponseModel} from '../../../shared-models/src/document-management/document-response.model'
import {DocumentRoleMappingResponseModel, RoleDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";
import { DeleteDto } from "packages/libs/shared-models/src/document-management/delete-dto";

export default class RoleSharedService extends CommonAxiosService { 
  private url = "/doc-upload";
  
  async createDocMapping(roleDto: RoleDto, config?: AxiosRequestConfig): Promise<DocumentRoleMappingResponseModel> {
    return this.axiosPostCall(this.url + "/createDocMapping", roleDto)
  }



  async getAllDocMappings(): Promise<DocumentRoleMappingResponseModel> {
    return this.axiosPostCall(this.url + "/getAllDocMappings", )
  }
  

}


  
  
