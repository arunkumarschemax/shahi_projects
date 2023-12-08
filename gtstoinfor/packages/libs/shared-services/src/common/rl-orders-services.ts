import { CommonResponseModel, FileIdReq, SaveOrderDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class RLOrdersService extends CommonAxiosService {
    private rlordersController = "/rl-orders"

    

    async getPdfFileInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/getPdfFileInfo")
    }
    
}