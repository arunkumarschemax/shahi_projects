import { AllWarehouseResponseModel, CommonResponseModel, FgItemCreIdRequest, ItemCreationDTO, WarehouseDto, WarehouseRequest, WarehouseResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class ItemCreationService extends CommonAxiosService{
  URL = "/fg-item";

  async createItem(req: ItemCreationDTO): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/createItem", req)
}

  async getFgItemsDropdown(req?:FgItemCreIdRequest): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getFgItemsDropdown",req)
  }
  async getAllFgItems(req?:any): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllFgItems",req)
  }
  async cancelItem(req:FgItemCreIdRequest): Promise<CommonResponseModel>{
    return this.axiosPostCall(this.URL + '/cancelOrder',req)
}
async getAll(): Promise<CommonResponseModel> {
  return this.axiosPostCall(this.URL + "/getAll")
}
async getAllStyleDropDown(): Promise<CommonResponseModel> {
  return this.axiosPostCall(this.URL + "/getAllStyleDropDown")
}
async getAllItemDropDown(): Promise<CommonResponseModel> {
  return this.axiosPostCall(this.URL + "/getAllItemDropDown")
}
async getAllBrandDropDown(): Promise<CommonResponseModel> {
  return this.axiosPostCall(this.URL + "/getAllBrandDropDown")
}
}
