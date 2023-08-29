import { ApiProperty } from "@nestjs/swagger";

export class RoleDto{
  docMappingId: number;
  roleName: string;
  documentName: string;
  createdUser: string;
  isActive: boolean;
  updatedUser: string | null;
  updatedAt: Date;
  createdAt: Date;
  versionFlag: number;
}