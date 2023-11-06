import { CustomerOrderStatusEnum } from "../../enum";
import { IndentFabricDTO } from "./indent-fabric-dto";
import { IndentTrimsDTO } from "./indent-trims-dto";

export class IndentDTO{
  indentId: number;
  requestNo: string;
  indentDate: Date;
  expectedDate: Date;
  indentCloseDate: Date;
  status: CustomerOrderStatusEnum;
  indentFabricDetails:IndentFabricDTO[];
  indentTrimDetails:IndentTrimsDTO[];
  remarks?: string;
  isActive?: boolean;
  createdAt?: Date;
  createdUser?: string | null;
  updatedAt?: Date;
  updatedUser?: string | null;
  versionFlag?: number;
  constructor(
    indentId: number,
    requestNo: string,
    indentDate: Date,
    expectedDate: Date,
    indentCloseDate: Date,
    status: CustomerOrderStatusEnum,
    indentFabricDetails:IndentFabricDTO[],
    indentTrimDetails:IndentTrimsDTO[],
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
  }


}
