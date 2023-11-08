import { SubstituionReq, SubstituionResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class SubstitutionService extends CommonAxiosService{
    URL = "/substituion";

    async createSubstitution(req:SubstituionReq): Promise<SubstituionResponseModel> {
        return this.axiosPostCall(this.URL + '/createSubstitution',req)   
    }
}