import { CommonAxiosService } from "../common-axios-service-prs";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {AllScanDto} from "../../../shared-models/src/shared-model/scan.dto";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {AllScanResponseModel} from "../../../shared-models/src/shared-model/scan-response";


export class SharedService extends CommonAxiosService {
  private ScanController = "/docs/";

  async postdata(payload: AllScanDto): Promise<AllScanResponseModel> {
    return this.axiosPostCall(
      this.ScanController + "postdata",
      payload
    );
  }

  async getdata(req): Promise<AllScanResponseModel> {
    console.log(req,"sharserv")
    return this.axiosPostCall(this.ScanController + "getdata",req);
  }

}