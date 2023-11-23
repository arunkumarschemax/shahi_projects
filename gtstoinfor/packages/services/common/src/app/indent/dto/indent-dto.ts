import { ApiProperty } from "@nestjs/swagger";
import { CustomerOrderStatusEnum } from "@project-management-system/shared-models";
import { IndentFabricEntity } from "../indent-fabric-entity";
import { IndentFabricDto } from "./indent-fabric-dto";
import { IndentTrimDto } from "./indent-trim-dto";

export class IndentDto{
  @ApiProperty()
  indentId: number;
  @ApiProperty()
  requestNo: string;
  @ApiProperty()
  indentDate: Date;
  @ApiProperty()
  style: number;
  @ApiProperty()
  expectedDate: Date;
  @ApiProperty()
  indentCloseDate: Date;
  @ApiProperty()
  status: CustomerOrderStatusEnum;
  @ApiProperty({type:IndentFabricDto})
  indentFabricDetails:IndentFabricDto[];
  @ApiProperty({type:IndentTrimDto})
  indentTrimDetails:IndentTrimDto[];
  @ApiProperty()
  sampleRequestId?: number;
  @ApiProperty()
  remarks?: string;
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
    indentId: number,
    requestNo: string,
    indentDate: Date,
    expectedDate: Date,
    indentCloseDate: Date,
    status: CustomerOrderStatusEnum,
    indentFabricDetails:IndentFabricDto[],
    indentTrimDetails:IndentTrimDto[],
    sampleRequestId?: number,
    remarks?: string,
    isActive?: boolean,
    createdAt?: Date,
    createdUser?: string | null,
    updatedAt?: Date,
    updatedUser?: string | null,
    versionFlag?: number,
  ){
    this.indentId = indentId;
    this.requestNo = requestNo;
    this.indentDate = indentDate;
    this.expectedDate = expectedDate;
    this.indentCloseDate = indentCloseDate;
    this.status = status;
    this.indentFabricDetails=indentFabricDetails;
    this.indentTrimDetails=indentTrimDetails;
    this.remarks = remarks;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.createdUser = createdUser;
    this.updatedAt = updatedAt;
    this.updatedUser = updatedUser;
    this.versionFlag = versionFlag;
    this.sampleRequestId = sampleRequestId;
  }


}
