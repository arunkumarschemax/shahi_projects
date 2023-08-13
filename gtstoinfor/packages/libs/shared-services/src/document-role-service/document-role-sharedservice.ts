import axios, { AxiosRequestConfig } from "axios";
import { AllDocumentRoleMappingsResponseModel, DocumentRoleMappingDto, DocumentRoleMappingResponseModel, RoleActivateDeactivateDto, RoleDto } from "@project-management-system/shared-models";
import {DeleteDto} from '../../../shared-models/src/document-management/delete-dto'
import { CommonAxiosService } from "../common-axios-service-prs";
export default class RoleSharedService extends CommonAxiosService{ 
  private url = "/doc-upload";
  
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


  async createDocMapping(dto: DocumentRoleMappingDto): Promise<DocumentRoleMappingResponseModel> {
    return this.axiosPostCall(this.url + "/createDocMapping",dto)
}


async getAllDocMappings(): Promise<AllDocumentRoleMappingsResponseModel> {
  return this.axiosPostCall(this.url + "/getAllDocMappings")
}

async activateOrDeactivate(req:RoleActivateDeactivateDto): Promise<AllDocumentRoleMappingsResponseModel> {
  return this.axiosPostCall(this.url + "/activateOrDeactivate",req)
}


  
}