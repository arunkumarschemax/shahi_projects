import { RmCreationDTO,CommonResponseModel, ProductGroupFilter } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class RmCreationService extends CommonAxiosService{
  URL = "/rm-creat";

  async createRm(req: RmCreationDTO): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/createRm", req)
}
async getRmItemsData(): Promise<CommonResponseModel> {
  return this.axiosPostCall(this.URL + "/getRmItemsData")
}
async getAllRMItems(req:any): Promise<CommonResponseModel> {
  return this.axiosPostCall(this.URL + "/getAllRMItems",req)
}

async getRmItemsDatabyProductGroupId(req:ProductGroupFilter): Promise<CommonResponseModel> {
  return this.axiosPostCall(this.URL + "/getRmItemsDatabyProductGroupId",req)
}

async getRmItemsDatabyProductGroupId1(req:ProductGroupFilter): Promise<CommonResponseModel> {
  return this.axiosPostCall(this.URL + "/getRmItemsDatabyProductGroupId1",req)
}
 
}