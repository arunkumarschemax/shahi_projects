import { CommonResponseModel} from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs"

export class EddieService extends CommonAxiosService {
    private eddierOrdersController = "/eddiebauer"

    async saveEddieOrder(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/saveEddieOrder", req)
    }

    async fileUpload(formData: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/fileUpload", formData)
    }


    async getorderacceptanceData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.eddierOrdersController + "/getorderacceptanceData", req)
    }

}