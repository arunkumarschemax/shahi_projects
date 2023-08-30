import { IsAlphanumeric, MaxLength, Matches, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class DepartmentsDTO {
  
  @ApiProperty()
  deptId: number;

  @ApiProperty()
  deptName: string;

  @ApiProperty()
  deptHead: string;

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

