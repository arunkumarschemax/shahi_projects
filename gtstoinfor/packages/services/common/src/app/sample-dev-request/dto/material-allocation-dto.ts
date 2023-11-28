import { MaterialStatusEnum } from "@project-management-system/shared-models";
import { ApiProperty } from "@nestjs/swagger";


export class MaterialAllocationDTO {
     @ApiProperty()
     materialAllocationId: number;

     @ApiProperty()
     itemType: string;

     @ApiProperty()
     sampleOrderId: number

     @ApiProperty()
     sampleItemId: number

     @ApiProperty()
      m3ItemId: number

     @ApiProperty()  
     buyerId:number

     @ApiProperty()
     status: MaterialStatusEnum;

     @ApiProperty()
     createdUser: string | null;

     @ApiProperty()
     quantity: number;
     
     @ApiProperty()
     issuedQty:number;

     @ApiProperty()
      stockId: number

     @ApiProperty()
     LocationId: number

     @ApiProperty()
     allocateQuantity: number

     @ApiProperty()
     checkedStatus:number


}