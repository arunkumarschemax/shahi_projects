import { ApiProperty } from "@nestjs/swagger";

export class DocumentDto{
  @ApiProperty()
  documentName: string;
  @ApiProperty()
  createdUser?: string;
 @ApiProperty()
  isActive?: boolean;
 @ApiProperty()
  updatedUser?: string | null;
 @ApiProperty()
  updatedAt?: Date;
 @ApiProperty()
  createdAt?: Date;
 @ApiProperty()
  versionFlag?: number;
  @ApiProperty()
  id?:number
  constructor(
    documentName?: string,
    createdUser?: string,
    isActive?: boolean,
    updatedUser?: string | null,
    updatedAt?: Date,
    createdAt?: Date,
    versionFlag?: number,
    id?:number)
  {
    this.documentName=documentName
    this.createdUser=createdUser
    this.isActive=isActive
    this.updatedUser=updatedUser
    this.updatedAt=updatedAt
    this.createdAt=createdAt
    this.versionFlag=versionFlag
    this.id=id
  }


}