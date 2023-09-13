import { ApiProperty } from "@nestjs/swagger";
import { DocumentDownloadEnum } from "@project-management-system/shared-models";

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
  @ApiProperty()
  priority?:number
  @ApiProperty()
  isDownload : DocumentDownloadEnum;
  constructor(
    documentName?: string,
    createdUser?: string,
    isActive?: boolean,
    updatedUser?: string | null,
    updatedAt?: Date,
    createdAt?: Date,
    versionFlag?: number,
    id?:number,priority?:number,
    isDownload ?: DocumentDownloadEnum
    )
  {
    this.documentName=documentName
    this.createdUser=createdUser
    this.isActive=isActive
    this.updatedUser=updatedUser
    this.updatedAt=updatedAt
    this.createdAt=createdAt
    this.versionFlag=versionFlag
    this.id=id
    this.priority=priority
    this.isDownload=isDownload
  }


}