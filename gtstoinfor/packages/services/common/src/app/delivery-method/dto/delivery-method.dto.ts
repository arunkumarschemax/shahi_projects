import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class DeliveryMethodDTO {
  @ApiProperty()
  // @MaxLength(7, { message: "States id allows maximum 7 characters" })
  //  @Matches(new RegExp("^[a-zA-Z0-9]+$"), '', { message: "States Code should not include these Characters !@#$%^&*()_+{}[]:\";'<>?,./~` " })
  // @IsNotEmpty({message:"Delivery Method id should not be empty"})
  // @IsAlphanumeric()
  // @IsOptional()
  deliveryMethodId?: number;
  @ApiProperty()
  // @MaxLength(15, { message: "Delivery Method allows maximum 15 characters" })
  // @IsNotEmpty()
  deliveryMethod: string;
  @ApiProperty()
  isActive: boolean;

  createdAt : Date;

  @ApiProperty()
  // @IsOptional()
  // @MaxLength(40, { message: "Created User allows maximum 40 characters" })
  // @Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"),{ message: "created user should be only numbers" })
  createdUser : string;

  updatedAt : Date;
  @ApiProperty()
  // @IsOptional()
  // @MaxLength(40, { message: "Updated User allows maximum 40 characters"})
  // @Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"),{ message: "updated user should be only numbers" })
  updatedUser : string;

  @ApiProperty()
  versionFlag : number;
}

