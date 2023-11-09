import { AllWarehouseResponseModel, WarehouseDto, WarehouseRequest, WarehouseResponseModel } from '@project-management-system/shared-models';
import { CommonAxiosService } from "../common-axios-service-prs";

export class WarehouseService extends CommonAxiosService{
  URL = "/warehouse";

  async createWarehouse(WareHouse: WarehouseDto): Promise<WarehouseResponseModel> {
    return this.axiosPostCall(this.URL + "/createWarehouse", WareHouse)
}

  async updateWareHouse(WareHouse: WarehouseDto): Promise<WarehouseResponseModel> {
    return this.axiosPostCall(this.URL + "/updateWareHouse", WareHouse)
  }
  async getAllWarehouse(req?:any): Promise<AllWarehouseResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllWarehouse',req)
  }

  async ActivatedeActivateWarehouse(
    warehouseDto: WarehouseDto
  ): Promise<WarehouseResponseModel> {
    return this.axiosPostCall(this.URL + '/activateOrDeactivateWarehouse', warehouseDto)

  }
  async getAllActiveWarehouse(): Promise<AllWarehouseResponseModel> {
    return this.axiosPostCall(this.URL + '/getAllActiveWarehouse')
  }
  async getWarehouseById(Request:WarehouseRequest): Promise<WarehouseResponseModel> {
    return this.axiosPostCall(this.URL + '/getWarehouseById',Request)
  }
  async getActiveWarehouseCount(): Promise<AllWarehouseResponseModel> {
    return this.axiosPostCall(this.URL + '/getActiveWarehouseCount')
  }
}
