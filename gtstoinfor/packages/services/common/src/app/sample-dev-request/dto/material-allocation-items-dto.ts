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
     locationId: number

     @ApiProperty()
     allocateQuantity: number

     @ApiProperty()
     createdUser: string | null;

}