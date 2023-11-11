import { ApiProperty } from '@nestjs/swagger';

export class BuyingHouseDTO {
  @ApiProperty()
  buyingHouseId: number;

  @ApiProperty()
  buyingHouse: string;

  @ApiProperty()
  contactPerson: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  countryId: number;

  @ApiProperty()
  countryName: string;

  @ApiProperty()
  isActive: boolean;
  createdAt : Date;

  @ApiProperty()
  createdUser : string;
  updatedAt : Date;
  
  @ApiProperty()
  updatedUser : string;

  @ApiProperty()
  versionFlag : number;
}

