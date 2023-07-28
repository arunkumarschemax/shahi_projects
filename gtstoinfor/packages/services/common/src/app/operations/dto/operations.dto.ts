import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OneToMany } from 'typeorm';

export class OperationDTO {
  @ApiProperty()
  @IsNotEmpty({message:"operationId should not be empty"})
  @IsOptional()
  operationId:number;

  @ApiProperty()
  // @IsNotEmpty({message:"operationCode should not be empty"})
  // @IsAlphanumeric()
  // @IsOptional()
  operationCode: string;

  @ApiProperty()
  @IsNotEmpty({message:"operationName should not be empty"})
  @IsAlphanumeric()
  @IsOptional()
  operationName: string;

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

