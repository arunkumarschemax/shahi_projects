import { ApiProperty } from "@nestjs/swagger";

export class FactoryDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  createdUser: any;
  @ApiProperty()
  updatedUser:string;
  @ApiProperty()
  isActive:boolean;
  @ApiProperty()
  versionFlag: number;
}

