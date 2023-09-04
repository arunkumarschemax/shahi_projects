import { CommonAxiosService } from "../common-axios-service-prs";


export class detailView extends CommonAxiosService {
  private url = "https://tms-backend.shahiapps.in/api/vendor-master-data";



  async getdetailview(): Promise<any> {
   //console.log('*****************************');
    return this.getvendorpostcall("https://tms-backend.shahiapps.in/api/vendor-master-data/getVendorById");
  }
  

  
}