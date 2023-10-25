import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemGroupEnum } from '@project-management-system/shared-models';


export class ItemGroupDto{

    @ApiProperty()
    @IsNotEmpty({message:"size Id should not be empty"})
    @IsOptional()
    itemGroupId: number;
  
    @ApiProperty()
  @MaxLength(15,{message:"itemGroup allows maxmum 20s characters"})
  @IsNotEmpty()
  itemGroup:ItemGroupEnum;
 
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