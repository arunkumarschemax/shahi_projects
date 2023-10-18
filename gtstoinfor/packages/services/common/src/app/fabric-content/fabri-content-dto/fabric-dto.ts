import { ApiProperty } from "@nestjs/swagger";

export class FabricContentDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  style: string;
  @ApiProperty()
  component: string;
  @ApiProperty()
  fabricContent: string;
  @ApiProperty()
  createdUser: any;
  @ApiProperty()
  updatedUser:string;
  @ApiProperty()
  isActive:boolean;
  @ApiProperty()
  version: number;
}

