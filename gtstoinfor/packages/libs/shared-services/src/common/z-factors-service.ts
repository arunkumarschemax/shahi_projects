import { CommonAxiosService } from '../common-axios-service-prs';
import { AllHMStyleResponseModel, AllThreadsResponseModel,CommonResponseModel,HMStylesModelDto} from '@project-management-system/shared-models';
export class ZFactoryService extends CommonAxiosService{
  private URL = "/z-factors-controller";


  async getGeoCode(): Promise< CommonResponseModel> {
    return this.axiosPostCall(this.URL + '/getGeoCode')
  }

  async getPlantCode(): Promise< CommonResponseModel> {
    return this.axiosPostCall(this.URL + '/getPlantCode')
  }

  async createZFactors(req: any): Promise<CommonResponseModel> {
    return this.axiosPostCall(this.URL + "/createZFactors",req )
}

}
