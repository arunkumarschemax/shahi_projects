import { ApiProperty } from "@nestjs/swagger";


export class InnerDiaDTO {
  @ApiProperty()
  innerDiaId:number;

  @ApiProperty()
  innerDia: string;

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

