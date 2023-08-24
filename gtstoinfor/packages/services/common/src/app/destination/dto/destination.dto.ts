import { IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate, IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OneToMany } from 'typeorm';
export class DestinationDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "destinationId should not be empty" })
  @IsOptional()
  destinationId: number;

  @ApiProperty()
  @IsNotEmpty({ message: "destination should not be empty" })
  @IsAlphanumeric()
  @IsOptional()
  destination: string;

  @ApiProperty()
  isActive: boolean;

  createdAt: Date;

  @ApiProperty()
  @IsOptional()
  @MaxLength(40, { message: "Created User allows maximum 40 characters" })
  @Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"), { message: "created user should be only numbers" })
  createdUser: string;

  updatedAt: Date;
  @ApiProperty()
  @IsOptional()
  @MaxLength(40, { message: "Updated User allows maximum 40 characters" })
  @Matches(new RegExp("^(?:[a-zA-Z\\s]|)+$"), { message: "updated user should be only numbers" })
  updatedUser: string;

  @ApiProperty()
  versionFlag: number;

  // @OneToMany(type=>EndCustomers, endCustomers=>endCustomers.currencyInfo,{cascade: true})
  // endCustomerInfo:EndCustomers[];
}

