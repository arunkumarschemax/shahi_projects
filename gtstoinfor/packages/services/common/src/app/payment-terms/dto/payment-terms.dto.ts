import {IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentTermsCategory } from '@project-management-system/shared-models';
export class PaymentTermsDTO {
  @ApiProperty()
  // @MaxLength(7, { message: "Payment Term id allows maximum 7 characters" })
  //  @Matches(new RegExp("^[a-zA-Z0-9]+$"), '', { message: "Payment Terms Code should not include these Charecters !@#$%^&*()_+{}[]:\";'<>?,./~` " })
  // @IsNotEmpty({message:"Payment Terms id should not be empty"})
  paymentTermsId: number;
  @ApiProperty()
  paymentTermsCategory:PaymentTermsCategory;
  @ApiProperty()
  @MaxLength(15, { message: "Payment Terms Name allows maximum 50 characters" })
  @IsNotEmpty()
  @Matches(new RegExp("^[a-zA-Z0-9\\s]+$"),{ message:"Payment Terms name should be only alpha numeric" })
  paymentTermsName: string;
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
    static paymentTermsId: number;
    static paymentTermsName: string;
    static paymentTermscategory: PaymentTermsCategory;
    static isActive: boolean;
    static updatedUser: string;
    static createdUser: string;
}

