import { ApiProperty } from "@nestjs/swagger";

export class EddieItemNoDtos {

   @ApiProperty()
   id: string;
   
   @ApiProperty()
   itemNo: string;
 
}