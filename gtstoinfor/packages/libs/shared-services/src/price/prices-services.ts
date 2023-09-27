import { CommonAxiosService } from "../common-axios-service-prs";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

import { AllPriceDto, AllPriceResponseModel, PriceListRequestModel } from '@xpparel/shared-models';


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

  async getPriceListByVendor(req: PriceListRequestModel): Promise<any> {
    return this.axiosPostCall(this.PriceController + "getPriceListByVendor", req);
  }

}