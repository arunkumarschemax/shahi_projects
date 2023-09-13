import { AllVendorsResponseModel, VendorFilterRequest, VendorRequest, VendorsDropDownResponseModel, VendorsDto, VendorsResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from '../common-axios-service-prs';

export class VendorsService extends CommonAxiosService{
    URL = '/Vendors';


    async create(dto: VendorsDto): Promise<VendorsResponseModel> {
        return this.axiosPostCall(this.URL + "/createVendor", dto)

    }


    async  update(dto: VendorsDto): Promise<VendorsResponseModel> {
        return this.axiosPostCall(this.URL + "/updateVendor", dto)

    }

    async  activateOrDeactivateVendor(dto: VendorRequest):Promise<VendorsResponseModel> {
        return this.axiosPostCall(this.URL + "/activateOrDeactivateVendor", dto)

    }

    async getAllVendors(req:VendorFilterRequest): Promise<AllVendorsResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllVendors",req)
  
    }

    async getAllActiveVendors(): Promise<AllVendorsResponseModel> {
        return this.axiosPostCall(this.URL + "/getAllActiveVendors")
  
    }

    async getVendorDataById(vendorRequest:VendorRequest): Promise<VendorsResponseModel> {
        return this.axiosPostCall(this.URL + "/getVendorDataById",vendorRequest)
   
    }
            
    /**
     * get vendors for drop down
     */
    async getVendorsDropDownData(): Promise<VendorsDropDownResponseModel> {
        return this.axiosPostCall(this.URL + "/getVendorsDropDownData")     
    }
            


    async getCurrenciesByVendorId(vendorRequest:VendorRequest): Promise<AllVendorsResponseModel> {
        return this.axiosPostCall(this.URL + "/getCurrenciesByVendorId",vendorRequest)     
 
    }

    async getVendorCodeDropdown(): Promise<AllVendorsResponseModel> {
        return this.axiosPostCall(this.URL + "/getVendorCodeDropdown")
  
    }

    async getVendorContactDropdown(): Promise<AllVendorsResponseModel> {
        return this.axiosPostCall(this.URL + "/getVendorContactDropdown")
  
    }

    async getVendorCityDropdown(): Promise<AllVendorsResponseModel> {
        return this.axiosPostCall(this.URL + "/getVendorCityDropdown")
  
    }

}