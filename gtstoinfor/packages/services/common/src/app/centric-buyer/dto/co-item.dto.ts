import { ApiProperty } from "@nestjs/swagger";

export class ItemNoDtos {

   @ApiProperty()
   id: string;
   
   @ApiProperty()
   itemNo: string;

   @ApiProperty()
   poNumber: string;
 
}