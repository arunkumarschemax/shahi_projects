import { CommonResponseModel, ProcurmentGroupModel, ProcurmentGroupRequest } from "@project-management-system/shared-models";
import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";

export class ProcurmentGroupService extends CommonAxiosService{

    URL ="/ProcurmentGroup";
    async createProcurmentGroup(dto: ProcurmentGroupRequest): Promise<ProcurmentGroupModel> {
        return this.axiosPostCall(this.URL + '/createProcurmentGroup',dto)
     }
    async getAllProcurmentGroup(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllProcurmentGroup")
    }
    
    async  updateProcurmentGroup(dto: ProcurmentGroupRequest): Promise<ProcurmentGroupModel> {
        return this.axiosPostCall(this.URL + '/updateProcurmentGroup', dto)
     }


    async  activateOrDeactivateProcurmentGroup(Dto: ProcurmentGroupRequest): Promise<ProcurmentGroupModel> {
        console.log(Dto ,"front activate")
         return this.axiosPostCall(this.URL + '/ActivateOrDeactivateProcurmentGroup', Dto)
                    
     }
     async getAllActiveProcurmentGroup(): Promise<ProcurmentGroupModel> {
        return this.axiosPostCall(this.URL + '/getAllActiveProcurmentGroup');
    }

}
