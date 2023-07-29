import { SupplierActivateDeactivateDto, SupplierCreateDto, SupplierResponse } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";


export default class SupplierService extends CommonAxiosService {
    private supplierController = '/supplier';
      
    async create(payload: SupplierCreateDto): Promise<SupplierResponse> {
        return this.axiosPostCall(this.supplierController + '/createSupplier', payload)
    }

    async getAllSuppliers(): Promise<any> {
        return await this.axiosPostCall(this.supplierController + '/getAllSuppliers')
    }

    async update(payload:any): Promise<any> {
        return await this.axiosPostCall(this.supplierController + '/update',payload)
    }

    async activateOrDeactivate(req:any): Promise<any> {
        return await this.axiosPostCall(this.supplierController +'/activateOrDeactivate', req)
    }
}