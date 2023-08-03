import {IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PackageTermsDTO {

  @ApiProperty()
  packageTermsId: number;
  
  @ApiProperty()
  @MaxLength(15, { message: "Package Terms Name allows maximum 50 characters" })
  @IsNotEmpty()
  @Matches(new RegExp("^[a-zA-Z0-9\\s]+$"),{ message:"Package Terms name should be only alpha numeric" })
  packageTermsName: string;

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
    static packageTermsId: number;
    static packageTermsName: string;
    static isActive: boolean;
    static updatedUser: string;
    static createdUser: string;
}

