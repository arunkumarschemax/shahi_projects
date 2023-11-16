import { LocationMappingReq, MaterialIssueIdreq, RackLocationStatusReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class LocationMappingService extends CommonAxiosService {
    URL = "/locationMapping"

    async getAllActiveRackPositions(): Promise<any> {
        return this.axiosPostCall(this.URL + "/getAllActiveRackPositions");
    }

    async getAllFabrics():Promise<any> {
        return this.axiosPostCall(this.URL + "/getAllFabrics")
    }

    async getOneItemAllocateDetails(req:MaterialIssueIdreq): Promise<any> {
        return this.axiosPostCall(this.URL + "/getOneItemAllocateDetails", req)
    }

    async postToStockLogs(req:LocationMappingReq): Promise<any> {
        return this.axiosPostCall(this.URL + "/postToStockLogs", req);
    }

    async updateRackLocationStatus(req:RackLocationStatusReq): Promise<any> {
        return this.axiosPostCall(this.URL + "/updateRackLocationStatus")
    }

}