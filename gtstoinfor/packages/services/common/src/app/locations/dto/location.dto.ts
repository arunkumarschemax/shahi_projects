import {IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LocationDTO {
  @ApiProperty()
  @IsNotEmpty({message:"Location id should not be empty"})
  @IsOptional()
  locationId: number;

  @ApiProperty()
  @MaxLength(15, { message: "Location Name allows maximum 50 characters" })
  @IsNotEmpty()
  @Matches(new RegExp("^[a-zA-Z0-9\\s]+$"),{ message:"Location name should be only alpha numeric" })
  locationName: string;

  @ApiProperty()
  @MaxLength(15, { message: "Location Code allows maximum 50 characters" })
  @IsNotEmpty()
  @Matches(new RegExp("^[a-zA-Z0-9\\s]+$"),{ message:"Location code should be only alpha numeric" })
  locationCode: string;
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

    static locationId: number;
    static locationName: string;
    static isActive: boolean;
    static updatedUser: string;
    static createdUser: string;
}

