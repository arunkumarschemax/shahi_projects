import {IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './address.dto';

export class BuyersDTO {

  @ApiProperty()
  buyerId: number;

  @ApiProperty()
  buyerCode: string;

  @ApiProperty()
  shortCode: string;

  @ApiProperty()
  buyerName: string;

  // @ApiProperty()
  // accountType: string;

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
  publicNote: string;

  @ApiProperty()
  privateNote: string;

  @ApiProperty()
  paymentTermsId : number;
  paymentTerms: string;

  @ApiProperty()
  shipmentTerms: string;

  @ApiProperty()
  paymentMethodId: number;
  paymentMethod: string;

  @ApiProperty()
  addressInfo: AddressDto[];
  
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

