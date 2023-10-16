import { AllWarehouseResponseModel, CommonResponseModel, ItemCreationDTO, WarehouseDto, WarehouseRequest, WarehouseResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class ItemCreationService extends CommonAxiosService{
  URL = "/item-creation";

  async createItem(req: ItemCreationDTO): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/createItem", req)
}

}
