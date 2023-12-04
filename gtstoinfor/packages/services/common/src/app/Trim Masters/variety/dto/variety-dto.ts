import { IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class VarietyDTO {
  
  @ApiProperty()
  varietyId:number;

  @ApiProperty()
  variety:string;

  @ApiProperty()
  varietyCode: string;

  @ApiProperty()
  isActive: boolean;

  createdAt: Date;

  @ApiProperty()
  createdUser: string;
  updatedAt: Date;

  @ApiProperty()
  updatedUser: string;

  @ApiProperty()
  versionFlag: number;
}

