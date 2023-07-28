import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OneToMany } from 'typeorm';

export class BrandsDTO {
  @ApiProperty()
  @IsNotEmpty({message:"brandId should not be empty"})
  @IsOptional()
  brandId:number;

  @ApiProperty()
  @IsNotEmpty({message:"brandName should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  brandName: string;

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

   @ApiProperty()
  @IsNotEmpty({message:"filePath should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  filePath: string;

  @ApiProperty()
  @IsNotEmpty({message:"fileName should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  fileName: string;
}

