import { AllBrandsResponseModel, BrandsRequest, MasterBrandsDto, MasterBrandsResponseModel, UploadResponse } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class MasterBrandsService extends CommonAxiosService{
  URL = "/master-brands";

  async createBrand(brand: MasterBrandsDto): Promise<MasterBrandsResponseModel> {
    // console.log('testss',brand)
    return this.axiosPostCall(this.URL + "/createMasterBrand", brand)
}

  async updateBrand(brand: MasterBrandsDto): Promise<MasterBrandsResponseModel> {
    return this.axiosPostCall(this.URL + "/updateBrands", brand)
  }
  async getAllBrands(req?:any): Promise<AllBrandsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllBrands',req)
  }

  // async ActivateDeActivateBrand(brand: MasterBrandsDto): Promise<MasterBrandsResponseModel> {
  //   console.log(brand,'shared-----------')
  //   return this.axiosPostCall(this.URL + '/activateOrDeactivateBrand', brand)

  // }
  async getAllActiveBrands(): Promise<AllBrandsResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveBrands')
  }
  async getBrandById(brandRequest:BrandsRequest): Promise<MasterBrandsResponseModel> {
    return this.axiosPostCall(this.URL + '/getActiveBrandsById',brandRequest)
  }

  async ActivateDeActivateBrand(brandReq: MasterBrandsDto): Promise<MasterBrandsResponseModel> {
    // console.log(brandReq,'shared-----------')
    return  this.axiosPostCall(this.URL + '/activateOrDeactivateBrand', brandReq)
}
async BrandLogoUpload(file: any): Promise<UploadResponse> {
  return await this.axiosPostCall(this.URL + '/fileUpload', file);
}
}
