import { AllPackageTermsResponseModel, PackageTermsDropDownResponseModel, PackageTermsDto, PackageTermsRequest, PackageTermsResponseModel } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";
import { UserRequestDto } from "../user-request";

export class PackageTermsService extends CommonAxiosService {
    URL = "/package-terms";

    async createPackageTerms(dto: PackageTermsDto): Promise<PackageTermsResponseModel> {
     //  console.log(dto,"777777");
       return this.axiosPostCall(this.URL + '/createPackageTerms',dto)
    }


    async  updatePackageTerms(dto: PackageTermsDto): Promise<PackageTermsResponseModel> {
        return this.axiosPostCall(this.URL + '/updatePackageTerms', dto)
     }


    async  activateOrDeactivatePackageTerms(Dto: PackageTermsDto): Promise<PackageTermsResponseModel> {
       // console.log(Dto ,"front activate")
         return this.axiosPostCall(this.URL + '/activateOrDeactivatePackageTerms', Dto)
                    
     }


     async getAllPackageTerms(req?:UserRequestDto): Promise<AllPackageTermsResponseModel> {
      //  console.log('uuuuuuu')
        return this.axiosPostCall(this.URL + '/getAllPackageTerms',req)
                     
        }

    async getAllpackageTermsDropDown(): Promise<PackageTermsDropDownResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllpackageTermsDropDown')
            
    }

    async getAllVendorPackagetTermsDropDown(): Promise<PackageTermsDropDownResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllVendorPackageTermsDropDown');
    }

    async getPackagetById(packageTermsRequest:PackageTermsRequest): Promise<PackageTermsResponseModel> {
        return this.axiosPostCall(this.URL + '/getPaById',packageTermsRequest);
    }

    async getAllActivePackageTerms(): Promise<AllPackageTermsResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllActivePackageTerms')
                     
    }
}