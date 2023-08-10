import {IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaxCategoriesEnum } from '@project-management-system/shared-models';

export class TaxesDTO {
  @ApiProperty()
  @IsNotEmpty({message:"Tax id should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  taxId?: number;
  @ApiProperty()
  @MaxLength(20, { message: "Tax Name allows maximum 20 characters" })
  @IsNotEmpty()
  @Matches(new RegExp("^[a-zA-Z0-9\\s]+$"),{ message:"Taxe name should be only alpha numeric" })
  taxName: string;
  @ApiProperty()
  @MaxLength(20, { message: "Tax Percentage allows maximum 20 characters" })
  @IsNotEmpty()
  @Matches(new RegExp("^[a-zA-Z0-9\\s]+$"),{ message:"Taxe Percentage should be only alpha numeric" })
  taxPercentage: number;

  @ApiProperty()
  taxCategory:TaxCategoriesEnum
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

  
}

