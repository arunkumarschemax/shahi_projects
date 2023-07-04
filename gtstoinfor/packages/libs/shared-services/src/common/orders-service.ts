import { CommonResponseModel, SaveOrderDto } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class OrdersService extends CommonAxiosService {
    private ordersController = "/orders"

    async saveOrder(payload: SaveOrderDto):Promise<CommonResponseModel> {
        return this.axiosPostCall(this.ordersController + "/saveOrder", payload)
    }

}