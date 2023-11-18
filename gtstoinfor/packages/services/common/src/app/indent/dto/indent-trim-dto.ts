import { ApiProperty } from "@nestjs/swagger";

export class IndentTrimDto{
    @ApiProperty()
    itrimsId: number;
    @ApiProperty()
    trimType: number;
    @ApiProperty()
    trimCode: number;
    @ApiProperty()
    size: number;
    @ApiProperty()
    color: number;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    quantityUnit: number;
    @ApiProperty()
    m3TrimCode: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    remarks: string;
    @ApiProperty()
    filePath: string;
    @ApiProperty()
    isUploaded: boolean;
    @ApiProperty()
    isActive?: boolean;
    @ApiProperty()
    createdAt?: Date;
    @ApiProperty()
    createdUser?: string | null;
    @ApiProperty()
    updatedAt?: Date;
    @ApiProperty()
    updatedUser?: string | null;
    @ApiProperty()
    versionFlag?: number;
  constructor(
    itrimsId: number,
    trimType: number,
    trimCode: number,
    size: number,
    color: number,
    quantity: number,
    quantityUnit: number,
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
    this.quantityUnit = quantityUnit;
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
