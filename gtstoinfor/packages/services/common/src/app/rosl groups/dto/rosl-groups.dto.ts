import { ApiProperty } from '@nestjs/swagger';

export class ROSLGroupsDTO {
  @ApiProperty()
  roslGroupId: number;

  @ApiProperty()
  roslGroup: string;

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

