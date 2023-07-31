import {IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BuyersDTO {

  @ApiProperty()
  buyerId: number;

  @ApiProperty()
  clientCode: string;

  @ApiProperty()
  clientName: string;

  @ApiProperty()
  accountType: string;

  @ApiProperty()
  gstNumber: string;

  @ApiProperty()
  contactPerson: string;

  @ApiProperty()
  phoneNo: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  currency: string;

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
  publicNote: string;

  @ApiProperty()
  privateNote: string;

  @ApiProperty()
  paymentTerms: string;

  @ApiProperty()
  shipmentTerms: string;

  @ApiProperty()
  paymentModeId: number;

  @ApiProperty()
  countryId:number;
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

