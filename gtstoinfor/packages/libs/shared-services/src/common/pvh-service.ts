import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class PvhService extends CommonAxiosService {
    private URL = "/pvh";

    async savePvhOrder(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/savePvhOrder", req)
    }

    async fileUpload(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/fileUpload", req)
    }

}