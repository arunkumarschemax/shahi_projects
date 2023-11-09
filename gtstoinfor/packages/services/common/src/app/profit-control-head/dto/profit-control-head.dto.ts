import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
 
export class ProfitControlHeadDTO{
    @ApiProperty()
  @IsNotEmpty({message:"profit Control head Id should not be empty"})
  @IsOptional()
  profitControlHeadId: number;

@ApiProperty()
@MaxLength(15,{message:"profit Control head allows maxmum 15 characters"})
@IsNotEmpty()
profitControlHead:string;

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