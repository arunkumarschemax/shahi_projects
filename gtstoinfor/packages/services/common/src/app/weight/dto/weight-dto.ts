import { ApiProperty } from '@nestjs/swagger';
import { TaxCategoriesEnum } from '@project-management-system/shared-models';
import { CommonColumns } from 'packages/services/common/common-columns.entity';
import {Column,Entity,Index,PrimaryGeneratedColumn,VersionColumn,UpdateDateColumn,CreateDateColumn} from 'typeorm';


export class WeightDto {
  @ApiProperty()
  weightId: number;

  @ApiProperty()
  weight:string

  

  @ApiProperty()
  createdUser: string | null;

  @ApiProperty()
  updatedUser: string | null;

  @ApiProperty()
  isActive: boolean;
}