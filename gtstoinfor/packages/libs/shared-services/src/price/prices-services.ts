import { CommonAxiosService } from "../common-axios-service-prs";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

import {AllPriceDto} from '../../../shared-models/src/price-model/prices.dto';
import {AllPriceResponseModel} from  '../../../shared-models/src/price-model';


export class PricesService extends CommonAxiosService {
  private PriceController = "/price/";

  async postdata(payload: AllPriceDto): Promise<AllPriceResponseModel> {
    return this.axiosPostCall(
      this.PriceController + "postdata",
      payload
    );
  }

  async getdata(): Promise<any> {
    return this.axiosPostCall(this.PriceController + "getdata");
  }

}