import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { AllItemTypeResponseModel,ItemTypeResponseModel,ItemTypeDto,ItemTypeRequestDto,ItemTypeDropDownResponse, DivisionRequest, ProductGroupRequest } from "@project-management-system/shared-models";
export class ItemTypeService extends CommonAxiosService{

    URL ="/itemType";

    async createItemType(depart: ItemTypeDto): Promise<ItemTypeResponseModel> {
        // console.log('testss',depart)
        return this.axiosPostCall(this.URL + "/createItemType", depart)
    }
    
    async updateItemType(item: ItemTypeDto): Promise<ItemTypeResponseModel> {
        return this.axiosPostCall(this.URL + '/updateItemType', item)
          
      }
    async getAllItemType(): Promise<ItemTypeResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllItemType')
          }

          async ActivateorDeactivateItemType(Dtos: ItemTypeDto): Promise<AllItemTypeResponseModel> {
            // console.log(Dtos);
            return this.axiosPostCall(this.URL + '/activeteOrDeactivateItemType', Dtos)
             
          }

          async getAllActiveItemType(): Promise<AllItemTypeResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveItemType')
              
          }

          async getActiveItemTypeById(deptReq: ItemTypeRequestDto): Promise<ItemTypeResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveItemTypeById', deptReq)
              
          }
          async getItemTypeForDivisionDropDown(req:DivisionRequest): Promise<ItemTypeDropDownResponse> {
            return this.axiosPostCall(this.URL + '/getItemfTypeorDivisionDropDown',req)
      
        }

        async getItemTypeForProductGroupDropDown(req:ProductGroupRequest): Promise<ItemTypeDropDownResponse> {
          return this.axiosPostCall(this.URL + '/getItemfTypeorProductGroupDropDown',req)
    
      }
}