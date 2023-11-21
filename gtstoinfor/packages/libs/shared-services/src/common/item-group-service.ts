import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { AllItemGroupResponseModel,ItemGroupResponseModel,ItemGroupDto,ItemGroupRequestDto,ItemgroupDropDownResponse } from "@project-management-system/shared-models";
export class ItemGroupService extends CommonAxiosService{

    URL ="/itemGroup";

    async createItemGroup(depart: ItemGroupDto): Promise<ItemGroupResponseModel> {
        //console.log('testss',depart)
        return this.axiosPostCall(this.URL + "/createItemGroup", depart)
    }
    
    async updateItemGroup(item: ItemGroupDto): Promise<ItemGroupResponseModel> {
        return this.axiosPostCall(this.URL + '/updateItemGroup', item)
          
      }
    async getAllitemGroup(): Promise<ItemGroupResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllItemGroup')
          }

          async ActivateorDeactivateItemGroup(Dtos: ItemGroupDto): Promise<AllItemGroupResponseModel> {
          //  console.log(Dtos);
            return this.axiosPostCall(this.URL + '/activeteOrDeactivateItemGroup', Dtos)
             
          }

          async getAllActiveItemGroup(): Promise<AllItemGroupResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveItemGroup')
              
          }

          async getActiveItemGroupById(deptReq: ItemGroupRequestDto): Promise<ItemGroupResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveItemGroupById', deptReq)
              
          }
}