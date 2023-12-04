import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { AllQualitysResponseModel,QualitysDTO,qualitysResponseModel } from "@project-management-system/shared-models";
export class QualitysService extends CommonAxiosService{
    URL ="/qualitys";

    async createQualitys(quality: QualitysDTO): Promise<qualitysResponseModel> {
        return this.axiosPostCall(this.URL + "/createqualitys", quality)
    }

    async updateQUalitys(Payment: QualitysDTO): Promise<qualitysResponseModel> {
        return this.axiosPostCall(this.URL + "/updatequalitys", Payment)
      }


      async getAllQualitys(): Promise<qualitysResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllQualitys')
      }

      async activateDeActivateQualitys(  Payment: QualitysDTO): Promise<qualitysResponseModel> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateQualitys', Payment)
    
      }
      async getAllActiveMethod(): Promise<qualitysResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllActivePaymentMethod')
      }
      // async getPaymentById(): Promise<qualitysResponseModel> {
      //   return this.axiosPostCall(this.URL + '/getPaymentMethodById')
      // }
      // async getActivePaymentMethod(): Promise<qualitysResponseModel> {
      //   return this.axiosPostCall(this.URL + '/getActivePaymentMethodCount')
      // }
}
