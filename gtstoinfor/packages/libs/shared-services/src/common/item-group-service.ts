import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { AllItemGroupResponseModel,ItemGroupResponseModel,ItemGroupDto,ItemGroupRequestDto,ItemgroupDropDownResponse } from "@project-management-system/shared-models";
export class ItemService extends CommonAxiosService{

    URL ="/itemGroup";

   
    
    async getAllitemGroup(): Promise<ItemGroupResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllItemGroup')
          }

   

}