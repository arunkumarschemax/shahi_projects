import { CommonAxiosService } from "../common-axios-service-prs";
import { AllItemsResponseModel,ItemsDto,ItemsRequest,ItemsResponseModel } from '@project-management-system/shared-models';
export class ItemsService extends CommonAxiosService{
  private URL = "/items";

  async createItems(items: ItemsDto): Promise<ItemsResponseModel> {
    // console.log('testss',currency)
    return this.axiosPostCall(this.URL + "/createItems", items)
}

  async updateitem(items: ItemsDto): Promise<ItemsResponseModel> {
    return this.axiosPostCall(this.URL + "/updateitem", items)
  }
  async getAllItems(): Promise<AllItemsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllItems')
  }

  async activateOrDeactivateItems( items: ItemsDto): Promise<ItemsResponseModel> {
    return this.axiosPostCall(this.URL + '/activateOrDeactivateItems', items)

  }
  async getAllActiveCurrencys(): Promise<AllItemsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveCurrencies')
  }
  async getItemById(itemsRequest:ItemsRequest): Promise<ItemsResponseModel> {
    return this.axiosPostCall(this.URL + '/getById',itemsRequest)
  }

}
