// import axios, { AxiosRequestConfig } from "axios";

// export default class SharedService {
//   async create(createDto: any, config?: AxiosRequestConfig): Promise<any> {
//     console.log(createDto, "cccc");
//     return await axios.post(
//       "http://localhost:8004/docs/postdata",
//       createDto,
//       config
//     );
//   }
//   async get(): Promise<any> {
//     return await axios.post("http://localhost:8004/docs/getdata");
//   }
// }


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

  async getdata(): Promise<AllScanResponseModel> {
    return this.axiosPostCall(this.ScanController + "getdata");
  }

}