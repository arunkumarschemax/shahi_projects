import { CommonResponseModel, FactoryResponseModel, SupplierActivateDeactivateDto, SupplierCreateDto, SupplierResponse } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";


export default class SupplierService extends CommonAxiosService {
    private supplierController = '/supplier';

    async createSupplier(dto: SupplierCreateDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.supplierController + '/createSupplier', dto)
    }

    async getAllSuppliers(): Promise<any> {
        return await this.axiosPostCall(this.supplierController + '/getAllSuppliers')
    }

    async updateSuppliers(dto: SupplierCreateDto): Promise<CommonResponseModel> {
        return await this.axiosPostCall(this.supplierController + '/updateSuppliers', dto)
    }

    async ActivateOrDeactivate(req: SupplierActivateDeactivateDto): Promise<SupplierResponse> {
        return await this.axiosPostCall(this.supplierController + '/ActivateOrDeactivate', req)
    }
}