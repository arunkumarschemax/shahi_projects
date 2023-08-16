import { CommonResponseModel } from "@project-management-system/shared-models"
import { CommonAxiosService } from "../common-axios-service-prs";



export default class NikeService extends CommonAxiosService {
    private DpomController = '/nike-dpom';

async getPPMData(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.DpomController + "/getPPMData")
}
}