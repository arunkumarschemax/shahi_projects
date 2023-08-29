import { CommonAxiosService } from "../common-axios-service-prs";


export class VendorService extends CommonAxiosService {
  private url = "https://tms-backend.shahiapps.in/api/vendor-master-data";



  async getAllVendors(): Promise<any> {
    console.log('*****************************');
    return this.getvendorpostcall("https://tms-backend.shahiapps.in/api/vendor-master-data/getAllVendors");
  }
  

  
}