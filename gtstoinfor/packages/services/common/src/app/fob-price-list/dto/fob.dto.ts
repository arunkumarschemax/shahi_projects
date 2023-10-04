import { ApiProperty } from "@nestjs/swagger";

export class FobDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  planningSeasonCode: string;
  @ApiProperty()
  planningSeasonYear: string;
  @ApiProperty()
  styleNumber: string;
  @ApiProperty()
  colorCode: string;
  @ApiProperty()
  sizeDescription: string;
  @ApiProperty()
  shahiConfirmedGrossPrice: number;
  @ApiProperty()
  shahiConfirmedGrossPriceCurrencyCode: string;
  @ApiProperty()
  createdUser: any;
  @ApiProperty()
  updatedUser:string;
  @ApiProperty()
  isActive:boolean;
  @ApiProperty()
  versionFlag: number;
}

