import { ApiProperty } from "@nestjs/swagger"
import { GRNTypeEnum, PurchaseOrderStatus } from "@project-management-system/shared-models"
import { PurchaseOrderFbricDto } from "./po-fabric-dto"
import { PurchaseOrderTrimDto } from "./po-trim-dto"
import { PoItemdetails } from "./po-items-dto"

export class PurchaseOrderDto{
    @ApiProperty()
    purchaseOrderId:number

    @ApiProperty()
    poNumber:string

    @ApiProperty()
    vendorId:number

    @ApiProperty()
    styleId:number

    @ApiProperty()
    buyerId:number

    @ApiProperty()
    expectedDeliveryDate:Date

    @ApiProperty()
    purchaseOrderDate:Date

    @ApiProperty()
   createdAt: string;
    
   @ApiProperty()
   createdUser: string | null;
    
   @ApiProperty()
   updatedAt: string;
    
   @ApiProperty()
   updatedUser: string | null;
    
   @ApiProperty()
   versionFlag: number;

   @ApiProperty()
   isActive: boolean;

   @ApiProperty()
   status:PurchaseOrderStatus

  @ApiProperty()
  remarks:string

  @ApiProperty()
  yarnUom:number

  @ApiProperty()
  poMaterialType:string

  @ApiProperty()
  poAgainst:GRNTypeEnum

  @ApiProperty()
  currencyId:number

  @ApiProperty()
  exchangeRate:number

  @ApiProperty()
  deliveryAddress:string

  @ApiProperty()
  totalAmount:string
  
  @ApiProperty()
  poItemInfo:PoItemdetails[]


}