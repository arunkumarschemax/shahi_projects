import { PurchaseOrderStatus } from "@project-management-system/shared-models"
import { PurchaseOrderFbricDto } from "./po-fabric-info"
import { PurchaseOrderTrimDto } from "./po-trim-info"

export class PurchaseOrderDto{
    purchaseOrderId:number
    poNumber:string
    vendorId:number
    styleId:number
    expectedDeliveryDate:Date
    purchaseOrderDate:Date
   createdAt: string;
   createdUser: string | null;
   updatedAt: string;
   updatedUser: string | null;
   versionFlag: number
   isActive: boolean
   status:PurchaseOrderStatus
  remarks:string
  poFabricInfo: PurchaseOrderFbricDto[]
  poTrimInfo:PurchaseOrderTrimDto[]

}