import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class VendorsDTO {

  @ApiProperty()
  vendorId?: number;

  @ApiProperty()
  vendorCode: string;

  @ApiProperty()
  vendorName: string;

  @ApiProperty()
  gstNumber: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  contactPerson: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  apartment: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  countryId: number;
  countryName?: string;
  
  @ApiProperty()
  currencyId: number;
  currencyName?: string;

  @ApiProperty()
  privateNote: string;

  @ApiProperty()
  publicNote: string;

  @ApiProperty()
  bankAccNo: string;

  @ApiProperty()
  bankIfsc: string;

  @ApiProperty()
  bankName: string;

  @ApiProperty()
  bankBranch: string;

  @ApiProperty()
  contactNumber: string;

  @ApiProperty()
  emailId: string;

  @ApiProperty()
  isActive: boolean;

  createdAt : Date;

  @ApiProperty()
  @MaxLength(40, { message: "Created User allows maximum 40 characters" })
  @Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"),{ message: "created user should be only numbers" })
  createdUser : string;

  updatedAt : Date;

  @ApiProperty()
  updatedUser : string;

  @ApiProperty()
  versionFlag : number;

}

