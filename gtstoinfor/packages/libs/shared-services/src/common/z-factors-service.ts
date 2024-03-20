import { CommonAxiosService } from '../common-axios-service-prs';
import { AllHMStyleResponseModel, AllThreadsResponseModel,HMStylesModelDto, ZFactorReq} from '@project-management-system/shared-models';
export class ZFactoryService extends CommonAxiosService{
  private URL = "/z-factors-controller";


  async getGeoCode(): Promise<AllHMStyleResponseModel> {
    return this.axiosPostCall(this.URL + '/getGeoCode')
  }

  async getPlantCode(): Promise<AllHMStyleResponseModel> {
    return this.axiosPostCall(this.URL + '/getPlantCode')
  }

  async getAllItems(): Promise<AllHMStyleResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllItems')
  }

  async getImCode(req:ZFactorReq): Promise<AllHMStyleResponseModel> {
    return this.axiosPostCall(this.URL + '/getImCode',req)
  }

}
