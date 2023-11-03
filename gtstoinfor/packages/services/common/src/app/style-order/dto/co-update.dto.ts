import { ApiProperty } from "@nestjs/swagger";

export class CoUpdateDto {
 @ApiProperty()
  coId: number;

  @ApiProperty()
  coLineId : number;

  @ApiProperty()
  coNumber:string;

  @ApiProperty()
  oldValue:string;

  @ApiProperty()
  updateValue:string;

  @ApiProperty()
  parameter:string;

  @ApiProperty()
  createdUser: string | null;

  @ApiProperty()
  updatedUser?: string | null;

  @ApiProperty()
  coUpdateId?:number;

  

}



