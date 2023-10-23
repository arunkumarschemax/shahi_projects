import { MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompositionDTO {

  @ApiProperty()
  id?: number;

  @ApiProperty()
  compositionCode: string;

  @ApiProperty()
  compositionDescription: string;

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

