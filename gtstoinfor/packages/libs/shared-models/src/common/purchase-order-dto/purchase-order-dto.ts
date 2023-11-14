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
  poMaterialType:string
  indentId:number[]
  poFabricInfo: PurchaseOrderFbricDto[]
  poTrimInfo?:PurchaseOrderTrimDto[]
  constructor(
    poNumber:string,
    vendorId:number,
    styleId:number,
    expectedDeliveryDate:any,
    purchaseOrderDate:any,
    remarks:string,
    poMaterialType:string,
    indentId:number[],
    poFabricInfo: PurchaseOrderFbricDto[],
  poTrimInfo?:PurchaseOrderTrimDto[]
  ){
    this.poNumber=poNumber
    this.vendorId=vendorId
    this.styleId=styleId
    this.expectedDeliveryDate=expectedDeliveryDate
    this.purchaseOrderDate=purchaseOrderDate
    this.remarks=remarks
    this.poFabricInfo=poFabricInfo
    this.poTrimInfo=poTrimInfo
    this.indentId=indentId
    this.poMaterialType=poMaterialType
  }

}