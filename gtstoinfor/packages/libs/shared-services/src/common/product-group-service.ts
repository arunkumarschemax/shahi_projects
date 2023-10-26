import { CommonResponseModel, ProductGroupModel, ProductGroupRequest } from "@project-management-system/shared-models";
import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";

export class ProductGroupService extends CommonAxiosService{

    URL ="/productGroup";
    async createProductGroup(dto: ProductGroupRequest): Promise<ProductGroupModel> {
        return this.axiosPostCall(this.URL + '/createProductGroup',dto)
     }
    async getAllProductGroup(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllProductGroup")
    }
    
    async  updateProductGroup(dto: ProductGroupRequest): Promise<ProductGroupModel> {
        return this.axiosPostCall(this.URL + '/updateProductGroup', dto)
     }


    async  activateOrDeactivateProductGroup(Dto: ProductGroupRequest): Promise<ProductGroupModel> {
        console.log(Dto ,"front activate")
         return this.axiosPostCall(this.URL + '/ActivateOrDeactivateProductGroup', Dto)
                    
     }
     async getAllActiveProductGroup(): Promise<ProductGroupModel> {
        return this.axiosPostCall(this.URL + '/getAllActiveProductGroup');
    }

}