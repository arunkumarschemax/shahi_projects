import { CommonResponseModel, FileIdReq, PoOrderFilter, SaveOrderDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class RLOrdersService extends CommonAxiosService {
    private rlordersController = "/rl-orders"

    

    async getPdfFileInfo(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/getPdfFileInfo")
    }

    async getorderData(req?:PoOrderFilter): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/getorderData",req)
    }

    async getorderDataByPoNumber(req:PoOrderFilter): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.rlordersController + "/getorderDataByPoNumber",req)
    }
    
}