import {IsInt, IsEmail, IsString, IsDateString, IsNumber, IsDate,IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OneToMany } from 'typeorm';
export class WarehouseDTO {
  @ApiProperty()
  // @IsNotEmpty({message:"warehouseId should not be empty"})
  @IsOptional()
  warehouseId: number;

  @ApiProperty()

  @IsOptional()
  warehouseName: string;
  @ApiProperty()
  
  @IsOptional()
  warehouseCode: string;

  @ApiProperty()
  @IsOptional()
  category: string;
  
  @ApiProperty()
  isActive: boolean;

  createdAt : Date;

  @ApiProperty()
  @IsOptional()
  createdUser : string;

  updatedAt : Date;
  @ApiProperty()
  @IsOptional()
  updatedUser : string;

  @ApiProperty()
  versionFlag : number;

  // @OneToMany(type=>EndCustomers, endCustomers=>endCustomers.currencyInfo,{cascade: true})
  // endCustomerInfo:EndCustomers[];
}

