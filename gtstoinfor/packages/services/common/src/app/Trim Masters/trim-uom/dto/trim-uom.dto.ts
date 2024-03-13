import { ApiProperty } from "@nestjs/swagger";


export class TrimUomDTO {
  @ApiProperty()
  uomId:number;

  @ApiProperty()
  uom: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt : Date;

  @ApiProperty()
  createdUser : string;

  @ApiProperty()
  updatedAt : Date;

  @ApiProperty()
  updatedUser : string;

  @ApiProperty()
  versionFlag : number;

  @ApiProperty()
  username : string;


}

