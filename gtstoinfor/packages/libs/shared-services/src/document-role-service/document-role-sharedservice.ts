import axios, { AxiosRequestConfig } from "axios";
import { DocumentRoleMappingResponseModel, RoleDto } from "@project-management-system/shared-models";
import {DeleteDto} from '../../../shared-models/src/document-management/delete-dto'
export default class RoleSharedService { 
  
  async createForm(formdataDto: RoleDto, config?: AxiosRequestConfig): Promise<DocumentRoleMappingResponseModel> {
    console.log(formdataDto, "cccc");
    return await axios.post("http://localhost:5000/roledata/createRole",
      formdataDto,
      config
    );
  }
  
  async getAllRoleNames(): Promise<DocumentRoleMappingResponseModel> {
    console.log('like')
    return await axios.post("http://localhost:5000/roledata/getAllRoleNames");
  }



  async activateOrDeactivateRole(
    formdataDto: DeleteDto,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return await axios.post(
      "http://localhost:5000/documentdata/activateOrDeactivaterole",
      formdataDto,
      config
    );
  }

  
}