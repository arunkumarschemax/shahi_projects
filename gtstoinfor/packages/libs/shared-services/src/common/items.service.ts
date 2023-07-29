import { AllItemsResponseModel, ItemIdReq, ItemsDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class ItemsService extends CommonAxiosService{
  URL = "/items";

  async creteItems(dto: ItemsDto): Promise<AllItemsResponseModel> {
    return this.axiosPostCall(this.URL + "/creteItems", dto)
}
async updateItem(dto: ItemsDto): Promise<AllItemsResponseModel> {
  return this.axiosPostCall(this.URL + "/updateItem", dto)
}
  async ActivateOrDeactivateItem(dto: ItemIdReq): Promise<AllItemsResponseModel> {
    return this.axiosPostCall(this.URL + "/ActivateOrDeactivateItem", dto)
  }

  async getAllItems(): Promise<AllItemsResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllItems")
  }

}
