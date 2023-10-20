import { MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RangeDTO {

  @ApiProperty()
  id?: number;

  @ApiProperty()
  rangeCode: string;

  @ApiProperty()
  rangeDescription: string;

  @ApiProperty()
  isActive: boolean;

  createdAt : Date;

  @ApiProperty()
  createdUser : string;
  @ApiProperty()
  updatedAt : Date;
  
  @ApiProperty()
  updatedUser : string;

  @ApiProperty()
  versionFlag : number;
}

