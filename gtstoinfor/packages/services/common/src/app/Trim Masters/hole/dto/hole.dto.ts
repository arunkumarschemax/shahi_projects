import { ApiProperty } from "@nestjs/swagger";


export class HoleDTO {
  @ApiProperty()
  holeId:number;

  @ApiProperty()
  hole: string;

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


}

