import { ApiProperty } from '@nestjs/swagger';
import { FabricType } from '../../fabric-types/fabric-type.entity';

export class FabriCWeaveDto {
  @ApiProperty()
  fabricWeaveId: number;

  @ApiProperty()
  fabricWeaveName: string;

  @ApiProperty()
  fabricWeaveCode: string;

  @ApiProperty()
  fabricWeaveImageName: string;

  @ApiProperty()
  fabricWeaveImagePath: string;

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

  @ApiProperty()
  fabricTypeId : number;
}

