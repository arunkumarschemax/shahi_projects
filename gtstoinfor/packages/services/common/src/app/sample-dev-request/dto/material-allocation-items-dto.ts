import { MaterialStatusEnum } from "@project-management-system/shared-models";
import { ApiProperty } from "@nestjs/swagger";


export class MaterialAllocationItemsDTO {


     @ApiProperty()
     materialAllocationItemsId: number;

     @ApiProperty()
     quantity: number;

     @ApiProperty()
      stockId: number

     @ApiProperty()
     LocationId: number

     @ApiProperty()
     allocatioQuantity: number

     @ApiProperty()
     createdUser: string | null;

}