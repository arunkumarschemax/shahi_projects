import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class SizeDto{

    @ApiProperty()
    @IsNotEmpty({message:"size Id should not be empty"})
    @IsOptional()
    sizeId: number;
  
  @ApiProperty()
  @MaxLength(15,{message:"size allows maxmum 20s characters"})
  @IsNotEmpty()
  size:string;
  
  @ApiProperty()
  @IsNotEmpty()
 divisionId:number;
 divisionName:string;
 
  @ApiProperty()
  isActive: boolean;
  
  createdAt: Date;
  
  
  @ApiProperty()
  @IsOptional()
  @MaxLength(20, {message:"Created User allows maximum 20 characters"})
  @Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"),{message:"created user should be only numbers"})
  createdUser :string;
  
  updatedAt: Date;
  @ApiProperty()
  @IsOptional()
  @MaxLength(20, { message: "Updated User allows maximum 20 characters"})
  @Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"),{ message: "updated user should be only numbers" })
  updatedUser : string;
  
  @ApiProperty()
  versionFlag : number;  
}