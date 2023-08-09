import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OneToMany } from 'typeorm';
export class CompanyDTO {
  @ApiProperty()
  @IsNotEmpty({message:"companyId should not be empty"})
  @IsOptional()
  companyId: number;

  @ApiProperty()
  @IsNotEmpty({message:"companyName should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  companyName: string;
  @ApiProperty()
  @IsNotEmpty({message:"companyCode should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  companyCode: string;
  @ApiProperty()
  @IsAlphanumeric()
  @IsOptional()
  organizationCode:string;

  @ApiProperty()
  isActive: boolean;

  createdAt : Date;

  @ApiProperty()
  @IsOptional()
  @MaxLength(40, { message: "Created User allows maximum 40 characters" })
  @Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"),{ message: "created user should be only numbers" })
  createdUser : string;

  updatedAt : Date;
  @ApiProperty()
  @IsOptional()
  @MaxLength(40, { message: "Updated User allows maximum 40 characters"})
  @Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"),{ message: "updated user should be only numbers" })
  updatedUser : string;

  @ApiProperty()
  versionFlag : number;

  // @OneToMany(type=>EndCustomers, endCustomers=>endCustomers.currencyInfo,{cascade: true})
  // endCustomerInfo:EndCustomers[];
}

