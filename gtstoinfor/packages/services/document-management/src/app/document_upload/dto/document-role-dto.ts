import { ApiProperty } from "@nestjs/swagger";

export class RoleDto{
  @ApiProperty()
  roleId: number;

  @ApiProperty()
  roleName: string;


  @ApiProperty()
  documentName: string;

  @ApiProperty()
  createdUser: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  updatedUser: string | null;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  versionFlag: number;
    departmentCode: string;
    location: string;
  


}