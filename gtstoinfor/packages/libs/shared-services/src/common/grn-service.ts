import { CommonResponseModel, GrnDto, GrnReq, IndentDTO, SourcingRequisitionReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class GRNService extends CommonAxiosService {
  URL = "/grn"
  // vendor='https://tms-backend.shahiapps.in/api/vendor-master-data/getAllVendors'


  async createGrn(dto: GrnDto): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/createGrn", dto)
  }

  async updateGrn(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/updateGrn")
  }
  
  async getAllGrn(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getAllGrn")
  }

  async getGrnItemById(req:GrnReq): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/getGrnItemById",req)
  }
}
