import { ApiProperty } from "@nestjs/swagger";

export class DocumentReqDto{
  
  
  @ApiProperty()
  id: number;
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
constructor(id : number,documentName:string,createdUser:string,isActive :boolean,updatedUser: string | null,versionFlag: number,updatedAt: Date,
  createdAt: Date,
  
)

{
  this.id = id;
  this.documentName=documentName
  this.createdUser=createdUser
  this.createdAt=createdAt
  this.isActive=isActive
  this.updatedUser = updatedUser
  this.updatedAt=updatedAt
  this.versionFlag=versionFlag


}}

