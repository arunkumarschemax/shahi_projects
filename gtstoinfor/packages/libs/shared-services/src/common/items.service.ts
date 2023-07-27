import { AllItemsResponseModel, ItemsDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class ItemsService extends CommonAxiosService{
  URL = "/items";

  async creteItems(dto: ItemsDto): Promise<AllItemsResponseModel> {
    return this.axiosPostCall(this.URL + "/creteItems", dto)
}

  async ActivateOrDeactivateItem(dto: ItemsDto): Promise<AllItemsResponseModel> {
    return this.axiosPostCall(this.URL + "/ActivateOrDeactivateItem", dto)
  }

}
