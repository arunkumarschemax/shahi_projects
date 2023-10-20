import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";

export class ProcurmentGroupService extends CommonAxiosService{

    URL ="/ProcurmentGroup";

    async getAllProcurmentGroup(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllProcurmentGroup")
    }
}