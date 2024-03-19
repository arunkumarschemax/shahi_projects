import { CommonAxiosService } from '../common-axios-service-prs';
import { AllHMStyleResponseModel, AllThreadsResponseModel,HMStylesModelDto} from '@project-management-system/shared-models';
export class ZFactoryService extends CommonAxiosService{
  private URL = "/z-factors-controller";


  async getGeoCode(): Promise<AllHMStyleResponseModel> {
    return this.axiosPostCall(this.URL + '/getGeoCode')
  }

  async getPlantCode(): Promise<AllHMStyleResponseModel> {
    return this.axiosPostCall(this.URL + '/getPlantCode')
  }

}
