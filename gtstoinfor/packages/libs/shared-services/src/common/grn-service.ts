import { CommonResponseModel, GrnDto, IndentDTO, SourcingRequisitionReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class GRNService extends CommonAxiosService {
  URL = "/grn"
  // vendor='https://tms-backend.shahiapps.in/api/vendor-master-data/getAllVendors'


  async creteGrn(dto: GrnDto): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/creteGrn", dto)
  }

  async updateGrn(): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/updateGrn")
  }
  

}
