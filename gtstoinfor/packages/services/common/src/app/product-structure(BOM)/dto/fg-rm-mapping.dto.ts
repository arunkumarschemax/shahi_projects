import { ApiProperty } from "@nestjs/swagger";
import { FgRMItemsMappingDto } from "./rm-item-dto";



export class FgRMMappingDto {

  
    @ApiProperty()
    fgitemId: number;

    @ApiProperty()
    fgitemCode: string;      

    @ApiProperty()
    itemInfo : FgRMItemsMappingDto[]

    @ApiProperty()
    createdUser?: string;


  
  }
  