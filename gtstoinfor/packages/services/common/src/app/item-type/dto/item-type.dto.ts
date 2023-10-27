import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class ItemTypeDtos{

    @ApiProperty()
    itemTypeId: number;
  
    @ApiProperty()
  itemType:string;

 
  @ApiProperty()
 productGroupId:number;
 productGroupName:string;

  @ApiProperty()
 divisionId:number;
 divisionName:string;
 
  @ApiProperty()
  isActive: boolean;
  
  createdAt: Date;
  
  
  @ApiProperty()
    createdUser :string;
  updatedAt: Date;

  @ApiProperty()
  updatedUser : string;
  
  @ApiProperty()
  versionFlag : number;  
}