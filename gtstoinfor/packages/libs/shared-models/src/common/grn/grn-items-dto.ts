import { ApiProperty } from "@nestjs/swagger";
import { CustomerOrderStatusEnum, PurchaseOrderStatus } from "@project-management-system/shared-models";

export class GrnItemsDto{
    grnItemId:number
    m3ItemCodeId:number
    productGroupId:number
    receivedQuantity:string
    receivedUomId:number
    acceptedQuantity:string
    acceptedUomId:number
    rejectedQuantity:string
    rejectedUomId:number
    conversionQuantity:string
    conversionUomId:number
    remarks:string
    createdAt?: Date;
    createdUser?: string | null;
    updatedAt?: Date;
    updatedUser?: string | null;
    versionFlag?: number;
    grnId?: number;
    poFabricId?: number;
    poTrimId?: number;

  constructor(
    grnItemId:number,
    m3ItemCodeId:number,
    productGroupId:number,
    receivedQuantity:string,
    receivedUomId:number,
    acceptedQuantity:string,
    acceptedUomId:number,
    rejectedQuantity:string,
    rejectedUomId:number,
    conversionQuantity:string,
    conversionUomId:number,
    remarks:string,
    createdAt?: Date,
    createdUser?: string | null,
    updatedAt?: Date,
    updatedUser?: string | null,
    versionFlag?: number,
    grnId?: number,
    poFabricId?: number,
    poTrimId?: number,
  ){
    this.grnItemId = grnItemId
    this.m3ItemCodeId = m3ItemCodeId
    this.productGroupId = productGroupId
    this.receivedQuantity = receivedQuantity
    this.receivedUomId = receivedUomId
    this.acceptedQuantity = acceptedQuantity
    this.acceptedUomId = acceptedUomId
    this.rejectedQuantity = rejectedQuantity
    this.rejectedUomId = rejectedUomId
    this.conversionQuantity = conversionQuantity
    this.conversionUomId = conversionUomId
    this.remarks = remarks
    this.createdAt = createdAt
    this.createdUser = createdUser
    this.updatedAt = updatedAt
    this.updatedUser = updatedUser
    this.versionFlag = versionFlag
    this.grnId = grnId
    this.poFabricId = poFabricId
    this.poTrimId = poTrimId
  }


}
