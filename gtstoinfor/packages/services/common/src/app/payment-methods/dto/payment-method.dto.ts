import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OneToMany } from 'typeorm';

export class PaymentMethodDTO{
    @ApiProperty()
  @IsNotEmpty({message:"paymentMethodId should not be empty"})
  @IsOptional()
  paymentMethodId: number;

    @ApiProperty()
    @MaxLength(15,{message:"Payment Method allows maxmum 15 characters"})
    @IsNotEmpty()
    paymentMethod:string;
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