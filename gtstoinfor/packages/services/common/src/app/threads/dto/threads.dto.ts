import { IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ThreadsDto {
  @ApiProperty()
  threadId: number;

  @ApiProperty()
  styleId: number;

  @ApiProperty()
  tex: string;

  @ApiProperty()
  quality: string;

  @ApiProperty()
  colorCombo: string;

  @ApiProperty()
  colorCode: string;

  @ApiProperty()
  shadeNumber: string;

  @ApiProperty()
  supplierId: number;

  @ApiProperty()
  isActive: boolean;

  createdAt : Date;

  @ApiProperty()
  createdUser : string;

  updatedAt : Date;
  @ApiProperty()
  updatedUser : string;

  @ApiProperty()
  versionFlag : number;

}

