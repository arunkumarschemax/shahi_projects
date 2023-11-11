import { ApiProperty } from "@nestjs/swagger";

export class IndentTrimsModel{
    itrimsId: number;
    trimType: string;
    trimCode: number;
    size: number;
    color: string;
    quantity: number;
    uomId: number;
    m3TrimCode: string;
    description: string;
    remarks: string;
    filePath: string;
    isUploaded: boolean;
    isActive?: boolean;
    createdAt?: Date;
    createdUser?: string | null;
    updatedAt?: Date;
    updatedUser?: string | null;
    versionFlag?: number;
  constructor(
    itrimsId: number,
    trimType: string,
    trimCode: number,
    size: number,
    color: string,
    quantity: number,
    uomId: number,
    m3TrimCode: string,
    description: string,
    remarks: string,
    filePath: string,
    isUploaded: boolean,
    isActive?: boolean,
    createdAt?: Date,
    createdUser?: string | null,
    updatedAt?: Date,
    updatedUser?: string | null,
    versionFlag?: number,
  ){
    this.itrimsId = itrimsId;
    this.trimType = trimType;
    this.trimCode = trimCode;
    this.size = size;
    this.color = color;
    this.quantity = quantity;
    this.uomId = uomId;
    this.m3TrimCode = m3TrimCode;
    this.description = description;
    this.remarks = remarks;
    this.filePath = filePath;
    this.isUploaded = isUploaded;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.createdUser = createdUser;
    this.updatedAt = updatedAt;
    this.updatedUser = updatedUser;
    this.versionFlag = versionFlag;
  }


}
