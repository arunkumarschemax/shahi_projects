import { CommonResponseModel, VendorIdReq, PurchaseOrderDto, PurchaseViewDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from "../common-axios-service-prs";

export class PurchaseOrderservice extends CommonAxiosService{
    URL='/po'
    vendor='https://tms-backend.shahiapps.in/api/vendor-master-data/getAllVendors'

    async cretePurchaseOrder(req: PurchaseOrderDto): Promise<CommonResponseModel> {
        console.log(req)
        return this.axiosPostCall(this.URL + '/cretePurchaseOrder', req)
      }
      async getPurchaseOrder(req?:PurchaseViewDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllPoData',req)
      }

    async getAllPONumbers(req: VendorIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllPONumbers', req)
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

      async getPODataById(req: VendorIdReq): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getPODataById', req)
      }
      async getPAllPurchaseOrderData(req?:PurchaseViewDto): Promise<CommonResponseModel> {
        return this.axiosPostCall(this.URL + '/getAllPurchaseOrderData',req)
      }

}


///getAllPurchaseOrderData