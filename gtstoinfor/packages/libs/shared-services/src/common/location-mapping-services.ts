import { CommonAxiosService } from "../common-axios-service-prs";

export class LocationMappingService extends CommonAxiosService {
    URL = "/locationMapping"

    async getAllActiveRackPositions(): Promise<any> {
        return this.axiosPostCall(this.URL + "/getAllActiveRackPositions");
    }

}