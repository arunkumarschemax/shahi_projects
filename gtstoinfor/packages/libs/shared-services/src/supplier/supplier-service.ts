import { CommonResponseModel, FactoryResponseModel, SupplierActivateDeactivateDto, SupplierCreateDto, SupplierResponse } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";


export default class SupplierService extends CommonAxiosService {
    private supplierController = '/supplier';
      
    // async createSupplier( dto: SupplierCreateDto): Promise<CommonResponseModel> {
    //     console.log(dto,"qqqqqqqqqqqq")
    //     return this.axiosPostCall(this.supplierController + '/createSupplier', dto)
    // }
    async createSupplier(payload: SupplierCreateDto): Promise<FactoryResponseModel> {
        return this.axiosPostCall(this.supplierController + "/createSupplier", payload)
    }


    async getAllSuppliers(): Promise<any> {
        return await this.axiosPostCall(this.supplierController + '/getAllSuppliers')
    }

    async updateSuppliers(dto:SupplierCreateDto): Promise<CommonResponseModel> {
        console.log(dto,"update")
        return await this.axiosPostCall(this.supplierController + '/updateSuppliers',dto)
    }

    async ActivateOrDeactivate(req:SupplierActivateDeactivateDto): Promise<SupplierResponse> {
        return await this.axiosPostCall(this.supplierController +'/ActivateOrDeactivate', req)
    }
}