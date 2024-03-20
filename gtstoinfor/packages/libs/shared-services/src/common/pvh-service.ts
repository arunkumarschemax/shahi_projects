import { CommonResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";



export class PvhService extends CommonAxiosService {
    static pvhBot() {
        throw new Error('Method not implemented.');
    }
    private URL = "/pvh";

    async savePvhOrder(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/savePvhOrder", req)
    }

    async fileUpload(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/fileUpload", req)
    }

    async getorderDataForInfo(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getorderDataForInfo", req)
    }

    async pvhBot(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/pvhBot")
    }

    async getPoNumber(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getPoNumber")
    }

    async getorderacceptanceData(req: any): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + "/getorderacceptanceData", req)
    }

}