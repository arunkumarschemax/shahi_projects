import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
 
export class ColourDTO{
    @ApiProperty()
  @IsNotEmpty({message:"Colour  Id should not be empty"})
  @IsOptional()
  colourId: number;

@ApiProperty()
@MaxLength(15,{message:"Colour allows maxmum 15 characters"})
@IsNotEmpty()
colour:string;

@ApiProperty()
  @IsNotEmpty()
 divisionId:number;
 divisionName:string;
 
@ApiProperty()
isActive: boolean;

createdAt: Date;


@ApiProperty()
@IsOptional()
@MaxLength(40, {message:"Created User allows maximum 40 characters"})
@Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"),{message:"created user should be only numbers"})
createdUser :string;

updatedAt: Date;
@ApiProperty()
@IsOptional()
@MaxLength(40, { message: "Updated User allows maximum 40 characters"})
@Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"),{ message: "updated user should be only numbers" })
updatedUser : string;

@ApiProperty()
versionFlag : number;
}