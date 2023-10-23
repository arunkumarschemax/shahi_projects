import { MaxLength, Matches, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchGroupDTO {

  @ApiProperty()
  id?: number;

  @ApiProperty()
  searchGrpCode: string;

  @ApiProperty()
  searchGrpName: string;

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

