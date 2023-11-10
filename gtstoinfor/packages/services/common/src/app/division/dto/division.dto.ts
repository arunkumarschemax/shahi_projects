import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OneToMany } from 'typeorm';
export class DivisionDTO {
  @ApiProperty()

  divisionId: number;

  @ApiProperty()

  divisionName: string;

  @ApiProperty()

  divisionCode: string;
  
  @ApiProperty()
  @IsOptional()
  companyId:number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt : Date;

  @ApiProperty()

  createdUser : string;
  @ApiProperty()
  updatedAt : Date;
  @ApiProperty()

  updatedUser : string;

  @ApiProperty()
  versionFlag : number;

  // @OneToMany(type=>EndCustomers, endCustomers=>endCustomers.currencyInfo,{cascade: true})
  // endCustomerInfo:EndCustomers[];
}

