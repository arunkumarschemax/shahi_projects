import { ApiProperty } from "@nestjs/swagger";
import { CustomerOrderStatusEnum, GRNTypeEnum, PurchaseOrderStatus } from "@project-management-system/shared-models";
import { GrnItemsDto } from "./grn-items-dto";

export class GrnDto{
  vendorId:number
  poId:number
  grnDate:Date
  contactPerson:string
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
  status:PurchaseOrderStatus
  grnType:GRNTypeEnum


  constructor(
    vendorId:number,
    poId:number,
    grnDate:Date,
    contactPerson:string,
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
    grnType?:GRNTypeEnum
  
  ){
    this.grnId = grnId
    this.grnNumber = grnNumber
    this.vendorId = vendorId
    this.poId = poId
    this.grnDate = grnDate
    this.contactPerson = contactPerson
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
    this.grnType = grnType
  }


}
