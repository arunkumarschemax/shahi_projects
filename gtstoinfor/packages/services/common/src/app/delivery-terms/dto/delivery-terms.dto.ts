import {IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class DeliveryTermsDTO {
  @ApiProperty()
  // @MaxLength(7, { message: "Delivery Term id allows maximum 7 characters" })
  //  @Matches(new RegExp("^[a-zA-Z0-9]+$"), '', { message: "Delivery Terms Code should not include these Charecters !@#$%^&*()_+{}[]:\";'<>?,./~` " })
  @IsNotEmpty({message:"Delivery Terms id should not be empty"})
  // @IsAlphanumeric()
  @IsOptional()
  deliveryTermsId: number;

  @ApiProperty()
  @MaxLength(15, { message: "Delivery Terms Name allows maximum 50 characters" })
  @IsNotEmpty()
  @Matches(new RegExp("^[a-zA-Z0-9\\s]+$"),{ message:"Delivery Terms name should be only alpha numeric" })
  deliveryTermsName: string;

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

    static deliveryTermsId: number;
    static deliveryTermsName: string;
    static isActive: boolean;
    static updatedUser: string;
    static createdUser: string;
}

