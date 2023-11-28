import { ApiProperty } from "@nestjs/swagger";
import { CustomerOrderStatusEnum, PurchaseOrderStatus } from "@project-management-system/shared-models";
import { GrnItemsEntity } from "../entities/grn-items-entity";
import { GRNItemDto } from "./grn-item-dto";

export class GrnDto{
  @ApiProperty()
  grnId:number
  @ApiProperty()
  grnNumber:string
  @ApiProperty()
  vendorId:number
  @ApiProperty()
  poId:number
  @ApiProperty()
  grnDate:Date
  @ApiProperty()
  contactPerson: string ;
  @ApiProperty()
  status:PurchaseOrderStatus
  @ApiProperty()
  remarks:string
  @ApiProperty()
  isActive?: boolean;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  createdUser?: string | null;
  @ApiProperty()
  updatedAt?: Date;
  @ApiProperty()
  updatedUser?: string | null;
  @ApiProperty()
  versionFlag?: number;
  // @ApiProperty()
  // styleId:number
  @ApiProperty()
  materialtype:string
  @ApiProperty()
  itemType:string
  @ApiProperty({ type: [GRNItemDto] })
  grnItemInfo: GRNItemDto[];
  @ApiProperty()
  invoiceNo: string

}

export class PurchaseOrderReq{
  @ApiProperty()
  purchaseOrderId:number
  @ApiProperty()
  poFabricId?: number;
  @ApiProperty()
  poTrimId?: number;
  @ApiProperty()
  materialType:string
  constructor(
  purchaseOrderId?:number,
    poFabricId?: number,
    poTrimId?: number,
  materialType?:string

  ){
    this.purchaseOrderId=purchaseOrderId
    this.poFabricId=poFabricId
    this.poTrimId=poTrimId
    this.materialType=materialType
  }

}