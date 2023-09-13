import { ApiProperty } from "@nestjs/swagger";
export class PriceDto {

  @ApiProperty()
  priceId: number;

  @ApiProperty()
  headOfChargers: string;

  @ApiProperty()
  perUnit: string;

  @ApiProperty()
  dpLogistics: string;

  @ApiProperty()
  nsh: string;

  @ApiProperty()
  ksr: string;


  @ApiProperty()
  unitPrice: string;

  @ApiProperty()
  vendor: string;


  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  createdUser: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  updatedUser: string


  @ApiProperty()
  versionFlag: number;
}