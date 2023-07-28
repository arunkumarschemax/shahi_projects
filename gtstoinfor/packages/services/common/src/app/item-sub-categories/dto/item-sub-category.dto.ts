import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ItemSubCategoryDto {
    @ApiProperty()
    // @IsOptional()
    itemSubCategoryId?: number;
    @ApiProperty()
    // @IsNotEmpty({message:"Item sub Category should not be empty"})
    itemSubCategory: string;
    @ApiProperty()
    // @IsNotEmpty({message:"Item sub Category Code should not be empty"})
    itemSubCategoryCode: string;

    @ApiProperty()
    // @IsNotEmpty({message:"Item Category code should not be empty"})
    itemCategoryId: number;
    itemCategoryName?: string;

    @ApiProperty()
    remarks: string;
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

