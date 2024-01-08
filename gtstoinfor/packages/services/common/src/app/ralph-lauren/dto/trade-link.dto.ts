import { ApiProperty } from "@nestjs/swagger";

export class tradeDto {
   
    @ApiProperty()
    id: number;

    @ApiProperty()
    pdfFileName: string

    createdAt: string;

    @ApiProperty()
    createdUser: string | null;

    updatedAt: string;
    
    @ApiProperty()
    updatedUser: string | null;

 

   

}