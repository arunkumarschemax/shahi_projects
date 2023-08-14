import { ApiProperty } from '@nestjs/swagger';

export class CustomGroupsDTO {
  @ApiProperty()
  customGroupId: number;

  @ApiProperty()
  customGroup: string;

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

