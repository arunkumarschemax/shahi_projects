import { CommonResponseModel, IndentDTO, SourcingRequisitionReq } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class IndentService extends CommonAxiosService {
  URL = "/Grn"
  vendor='https://tms-backend.shahiapps.in/api/vendor-master-data/getAllVendors'

  async getAllVendors():Promise<any>{
    try{
      return  this.getvendorpostcall(this.vendor)
    }catch(err){
      console.log(err)
    }
  }
  

}
