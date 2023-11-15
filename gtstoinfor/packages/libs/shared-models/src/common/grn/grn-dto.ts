import { ApiProperty } from "@nestjs/swagger";
import { CustomerOrderStatusEnum, PurchaseOrderStatus } from "@project-management-system/shared-models";
import { GrnItemsDto } from "./grn-items-dto";

export class GrnDto{
  grnId:number
  grnNumber:string
  vendorId:number
  poId:number
  grnDate:Date
  status:PurchaseOrderStatus
  remarks:string
  grnItemInfo: GrnItemsDto[];
  isActive?: boolean;
  createdAt?: Date;
  createdUser?: string | null;
  updatedAt?: Date;
  updatedUser?: string | null;
  versionFlag?: number;

  constructor(
    grnId:number,
    grnNumber:string,
    vendorId:number,
    poId:number,
    grnDate:Date,
    status:PurchaseOrderStatus,
    remarks:string,
    grnItemInfo: GrnItemsDto[],
    isActive?: boolean,
    createdAt?: Date,
    createdUser?: string | null,
    updatedAt?: Date,
    updatedUser?: string | null,
    versionFlag?: number
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
  }


}
