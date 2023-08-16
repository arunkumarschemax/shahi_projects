import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";


export class NikeService extends CommonAxiosService  {
    private DpomController = "/nike-dpom"


    async getFactoryReportData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.DpomController + "/getFactoryReportData")
    }
    async getPPMData(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.DpomController + "/getPPMData")
    }
    }
