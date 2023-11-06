import { ApiProperty } from "@nestjs/swagger";
import { CustomerOrderStatusEnum } from "@project-management-system/shared-models";

export class IndentFabricDTO{
    ifabricId: number;
    content: string;
    fabricType: string;
    weaveId: number;
    weight: number;
    uomId: number;
    width: number;
    yarnCount: number;
    unit: number;
    construction: string;
    finish: string;
    shrinkage: string;
    m3FabricCode: string;
    color: number;
    pch: number;
    moq: number;
    moqUnit: number;
    moqPrice: number;
    moqPriceUnit: number;
    season: string;
    supplierId: number;
    buyerId: number;
    grnDate: Date;
    xlNo: string;
    quantity: number;
    quantityUomId: string;
    file_path: string;
    isUploaded: boolean;
    expectedDate: Date;
    indentCloseDate: Date;
    remarks: string;
    isActive?: boolean;
    createdAt?: Date;
    createdUser?: string | null;
    updatedAt?: Date;
    updatedUser?: string | null;
    versionFlag?: number;
  constructor(
    ifabricId: number,
    content: string,
    fabricType: string,
    weaveId: number,
    weight: number,
    uomId: number,
    width: number,
    yarnCount: number,
    unit: number,
    construction: string,
    finish: string,
    shrinkage: string,
    m3FabricCode: string,
    color: number,
    pch: number,
    moq: number,
    moqUnit: number,
    moqPrice: number,
    moqPriceUnit: number,
    season: string,
    supplierId: number,
    buyerId: number,
    grnDate: Date,
    xlNo: string,
    quantity: number,
    quantityUomId: string,
    file_path: string,
    isUploaded: boolean,
    expectedDate: Date,
    indentCloseDate: Date,
    remarks: string,
    isActive?: boolean,
    createdAt?: Date,
    createdUser?: string | null,
    updatedAt?: Date,
    updatedUser?: string | null,
    versionFlag?: number,
  ){
    this.ifabricId=ifabricId;
    this.content=content;
    this.fabricType=fabricType;
    this.weaveId=weaveId;
    this.weight=weight;
    this.uomId=uomId;
    this.width=width;
    this.yarnCount=yarnCount;
    this.unit=unit;
    this.construction=construction;
    this.finish=finish;
    this.shrinkage=shrinkage;
    this.m3FabricCode=m3FabricCode;
    this.color=color;
    this.pch=pch;
    this.moq=moq;
    this.moqUnit=moqUnit;
    this.moqPrice=moqPrice;
    this.moqPriceUnit=moqPriceUnit;
    this.season=season;
    this.supplierId=supplierId;
    this.buyerId=buyerId;
    this.grnDate=grnDate;
    this.xlNo=xlNo;
    this.quantity=quantity;
    this.quantityUomId=quantityUomId;
    this.file_path=file_path;
    this.isUploaded=isUploaded;
    this.expectedDate=expectedDate;
    this.indentCloseDate=indentCloseDate;
    this.remarks=remarks;
    this.isActive=isActive;
    this.createdAt=createdAt;
    this.createdUser=createdUser;
    this.updatedAt=updatedAt;
    this.updatedUser=updatedUser;
    this.versionFlag=versionFlag;
  }


}
