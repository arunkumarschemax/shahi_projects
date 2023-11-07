import { CommonResponseModel, HierarchyLevelRequest, hierachyLevelModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";

export class HierachyLevelService extends CommonAxiosService{

    URL ="/hierachyLevel";

    async getAllhierachyLevel(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllhierachyLevel")
    }
    async createhierachyLevel(dto: HierarchyLevelRequest): Promise<hierachyLevelModel> {
        return this.axiosPostCall(this.URL + '/createhierachyLevel',dto)
     }
   
    
    async  updatehierachyLevel(dto: HierarchyLevelRequest): Promise<hierachyLevelModel> {
        return this.axiosPostCall(this.URL + '/updatehierachyLevel', dto)
     }


    async  activateOrDeactivatehierachyLevel(Dto: HierarchyLevelRequest): Promise<hierachyLevelModel> {
     //   console.log(Dto ,"front activate")
         return this.axiosPostCall(this.URL + '/ActivateOrDeactivatehierachyLevel', Dto)
                    
     }
     async getAllActivehierachyLevel(): Promise<hierachyLevelModel> {
        return this.axiosPostCall(this.URL + '/getAllActivehierachyLevel');
    }

}