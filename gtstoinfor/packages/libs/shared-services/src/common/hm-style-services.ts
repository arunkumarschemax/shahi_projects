import { CommonAxiosService } from '../common-axios-service-prs';
import { AllHMStyleResponseModel, AllThreadsResponseModel,HMStylesModelDto} from '@project-management-system/shared-models';
export class HMStyleSharedService extends CommonAxiosService{
  private URL = "/hm-style-controller";

  async createHMStyle(items:HMStylesModelDto ): Promise<AllHMStyleResponseModel> {
    return this.axiosPostCall(this.URL + "/createHMStyle", items)
}

  async getHMStyle(): Promise<AllHMStyleResponseModel> {
    return this.axiosPostCall(this.URL + '/getHMStyle')
  }

  async getAllStyles(): Promise<AllHMStyleResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllStyles')
  }
}
