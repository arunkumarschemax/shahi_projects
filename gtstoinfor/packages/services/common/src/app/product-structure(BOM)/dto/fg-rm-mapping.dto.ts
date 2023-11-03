import { ApiProperty } from "@nestjs/swagger";



export class FgRMMappingDto {

    @ApiProperty()
    FgRmId: number;
  
    @ApiProperty()
    fgitemId: number;

    @ApiProperty()
    fgitemCode: string;      

    @ApiProperty()
    rmitemId: number;
    
    @ApiProperty()
    rmitemCode: string;

    @ApiProperty()
    createdUser?: string;


  
  }
  