import { CommonResponseModel, PurchaseOrderDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class PurchaseOrderservice extends CommonAxiosService{
    URL='/po'
    async cretePurchaseOrder(req: PurchaseOrderDto): Promise<CommonResponseModel> {
        console.log(req)
        return this.axiosPostCall(this.URL + '/cretePurchaseOrder', req)
      }

    async getAllPONumbers(vendorId:number): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllPONumbers', vendorId)
      }
}