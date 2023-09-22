import { CommonAxiosService } from "../common-axios-service-prs";
import { VendorIdreq } from "./buyers";


export class detailView extends CommonAxiosService {
  private url = "https://tms-backend.shahiapps.in/api/vendor-master-data";



  async getdetailview(): Promise<any> {
   //console.log('*****************************');
    return this.getvendorpostcall("https://tms-backend.shahiapps.in/api/vendor-master-data/getVendorById");
  }

  async getbranchview(req:VendorIdreq): Promise<any> {
    console.log('*****************************');
     return this.getvendorpostcall("https://tms-backend.shahiapps.in/api//vendor-master-data/getVbsBranchByVendorId",req);
   }
  

  
}