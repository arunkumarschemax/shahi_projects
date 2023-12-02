import { ApiProperty } from '@nestjs/swagger';
export class TrimDTO {
  
  @ApiProperty()
  trimId:number;

  @ApiProperty()
  trimCategory:string;

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

