import { CommonAxiosService } from "../common-axios-service-prs";


export default class SupplierService extends CommonAxiosService {
    private supplierController = '/supplier';

 
    async create(createDto:any): Promise<any> {
        return await this.axiosPostCall(this.supplierController + '/create', createDto)
    }

    async getAllSuppliers(): Promise<any> {
        return await this.axiosPostCall(this.supplierController + '/getAllSuppliers')
    }

    async update(createDto:any): Promise<any> {
        return await this.axiosPostCall(this.supplierController + '/update',createDto)
    }

    async activateOrDeactivate(createDto:any): Promise<any> {
        return await this.axiosPostCall(this.supplierController +'/activateOrDeactivate', createDto)
    }
}