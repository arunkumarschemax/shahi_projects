import { CustomerOrderStatusEnum } from "../../enum";
import { IndentFabricDTO } from "./indent-fabric-dto";
import { IndentFabricModel } from "./indent-fabric-model";
import { IndentTrimsModel } from "./indent-trim-model";
import { IndentTrimsDTO } from "./indent-trims-dto";

export class IndentModel{
  indentId: number;
  requestNo: string;
  indentDate: Date;
  expectedDate: Date;

  status: CustomerOrderStatusEnum;
  indentFabricDetails:IndentFabricModel[];
  indentTrimDetails:IndentTrimsModel[];
  style?: string;
  description?:string;

  createdAt?: Date;

  constructor(
    indentId: number,
    requestNo: string,
    indentDate: Date,
    expectedDate: Date,

    status: CustomerOrderStatusEnum,
    indentFabricDetails:IndentFabricModel[],
    indentTrimDetails:IndentTrimsModel[],
    style?: string,
    description?:string,

    createdAt?: Date,

  ){
    this.indentId = indentId;
    this.requestNo = requestNo;
    this.indentDate = indentDate;
    this.expectedDate = expectedDate;
   
    this.status = status;
    this.indentFabricDetails=indentFabricDetails;
    this.indentTrimDetails=indentTrimDetails;
    this.style = style;
    this.description = description;
    this.createdAt = createdAt;

  }


}
