import { ApiProperty } from '@nestjs/swagger';

export class CommissionDTO {
  @ApiProperty()
  commissionId: number;

  @ApiProperty()
  commission: string;

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

