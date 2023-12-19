import { ApiProperty } from "@nestjs/swagger";


export class FinishDTO {
  @ApiProperty()
  finishId:number;

  // @ApiProperty()
  // type:string;

  @ApiProperty()
  finish:string;

  @ApiProperty()
  finishCode: string;

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

