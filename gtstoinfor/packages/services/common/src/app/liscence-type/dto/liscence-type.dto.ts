import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LiscenceTypeDTO {
  @ApiProperty()
  
  liscenceTypeId?: number;
  @ApiProperty()
  
  liscenceType: string;
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

