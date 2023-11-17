import { ApiProperty } from "@nestjs/swagger";
import { CustomerOrderStatusEnum, PurchaseOrderStatus } from "@project-management-system/shared-models";
import { GrnItemsDto } from "./grn-items-dto";

export class GrnDto{
  vendorId:number
  poId:number
  grnDate:Date
  status:PurchaseOrderStatus
  remarks:string
  isActive?: boolean;
  createdAt?: Date;
  createdUser?: string | null;
  updatedAt?: Date;
  updatedUser?: string | null;
  versionFlag?: number;
  styleId?:number
  materialtype?:string
  grnItemInfo?: GrnItemsDto[];
  grnId?:number
  grnNumber?:string


  constructor(
    vendorId:number,
    poId:number,
    grnDate:Date,
    status:PurchaseOrderStatus,
    remarks:string,
    isActive?: boolean,
    createdAt?: Date,
    createdUser?: string | null,
    updatedAt?: Date,
    updatedUser?: string | null,
    versionFlag?: number,
    styleId?:number,
    materialtype?:string,
    grnItemInfo?: GrnItemsDto[],
    grnId?:number,
    grnNumber?:string,
  
  ){
    this.grnId = grnId
    this.grnNumber = grnNumber
    this.vendorId = vendorId
    this.poId = poId
    this.grnDate = grnDate
    this.status = status
    this.remarks = remarks
    this.grnItemInfo = grnItemInfo
    this.isActive = isActive
    this.createdAt = createdAt
    this.createdUser = createdUser
    this.updatedAt = updatedAt
    this.updatedUser = updatedUser
    this.versionFlag = versionFlag
    this.styleId = styleId
    this.materialtype = materialtype
  }


}
