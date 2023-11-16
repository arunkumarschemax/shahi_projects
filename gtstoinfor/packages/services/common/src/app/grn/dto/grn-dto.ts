import { ApiProperty } from "@nestjs/swagger";
import { CustomerOrderStatusEnum, PurchaseOrderStatus } from "@project-management-system/shared-models";
import { GrnItemsEntity } from "../entities/grn-items-entity";

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
  @ApiProperty({ type: [GrnItemsEntity] })
  grnItemInfo: GrnItemsEntity[];


}
