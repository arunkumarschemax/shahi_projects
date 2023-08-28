import { ApiProperty } from "@nestjs/swagger";

export class AddressDto{

  @ApiProperty()
  addressId:number

  @ApiProperty()
  countryId:number;
  countryName: string;

  @ApiProperty()
  state:string;

  @ApiProperty()
  district:string;

  @ApiProperty()
  city:string;

  @ApiProperty()
  landmark:string;

  @ApiProperty()
  lane1:string;

  @ApiProperty()
  lane2:string;

  @ApiProperty()
  pincode:string;

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