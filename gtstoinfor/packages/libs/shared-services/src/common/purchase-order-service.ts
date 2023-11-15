import { CommonResponseModel, PurchaseOrderDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class PurchaseOrderservice extends CommonAxiosService{
    URL='/po'
    vendor='https://tms-backend.shahiapps.in/api/vendor-master-data/getAllVendors'

    async cretePurchaseOrder(req: PurchaseOrderDto): Promise<CommonResponseModel> {
        console.log(req)
        return this.axiosPostCall(this.URL + '/cretePurchaseOrder', req)
      }
      async getPurchaseOrder(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllPoData')
      }

    async getAllPONumbers(vendorId:number): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllPONumbers', vendorId)
      }

      async getAllVendors():Promise<any>{
        try{
          return  this.getvendorpostcall(this.vendor)  
        }catch(err){
          console.log(err)
        }
      }

      async getMaterialTpye(): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getMaterialTpye')
      }
}


