import { FeatureSubstituionReq, SubResponseModel, SubstituionReq, SubstituionResponseModel, fgItemIdReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class SubstitutionService extends CommonAxiosService{
    URL = "/substituion";

    async createSubstitution(req:SubstituionReq): Promise<SubstituionResponseModel> {
        return this.axiosPostCall(this.URL + '/createSubstitution',req)   
    }

    async getSubstitution(req?:fgItemIdReq):Promise<SubResponseModel>{
        // console.log(req,"88888888888888")
        return this.axiosPostCall(this.URL + '/getSubstitution',req)
    }

    async getFgSku(req?:fgItemIdReq):Promise<SubResponseModel>{
        // console.log(req,"88888888888888")
        return this.axiosPostCall(this.URL + '/getFgSku',req)
    }

    async getRmSku(req?:fgItemIdReq):Promise<SubResponseModel>{
        // console.log(req,"88888888888888")
        return this.axiosPostCall(this.URL + '/getRmSku',req)
    }

    async createFeatureSubstitution(req:FeatureSubstituionReq): Promise<SubstituionResponseModel> {
        return this.axiosPostCall(this.URL + '/createFeatureSubstitution',req)   
    }
    
}