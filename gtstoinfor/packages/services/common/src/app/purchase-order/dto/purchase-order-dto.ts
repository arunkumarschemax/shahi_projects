import { ApiProperty } from "@nestjs/swagger"
import { PurchaseOrderStatus } from "@project-management-system/shared-models"
import { PurchaseOrderFbricDto } from "./po-fabric-dto"
import { PurchaseOrderTrimDto } from "./po-trim-dto"

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
  indentId:number[]


  @ApiProperty()
  poFabricInfo: PurchaseOrderFbricDto[]

  @ApiProperty()
  poTrimInfo?:PurchaseOrderTrimDto[]

}