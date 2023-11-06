import { CommonResponseModel, OperationsRequest } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class OperationInventoryService extends CommonAxiosService {
    URL = "/operation-inventory";

    async getOperationinventory(req:OperationsRequest): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllOperations",req)
    }
}