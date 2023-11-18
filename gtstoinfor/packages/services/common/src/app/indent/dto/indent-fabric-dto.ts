import { ApiProperty } from "@nestjs/swagger";
import { CustomerOrderStatusEnum } from "@project-management-system/shared-models";

export class IndentFabricDto{
    @ApiProperty()
    ifabricId: number;
    // @ApiProperty()
    // content: string;
    // @ApiProperty()
    // fabricType: string;
    // @ApiProperty()
    // weaveId: number;
    // @ApiProperty()
    // weight: number;
    @ApiProperty()
    uomId: number;
    // @ApiProperty()
    // width: number;
    // @ApiProperty()
    // yarnCount: number;
    // @ApiProperty()
    // yarnUnit: number;
    // @ApiProperty()
    // weightUnit:number;
    // @ApiProperty()
    // construction: string;
    // @ApiProperty()
    // finish: string;
    // @ApiProperty()
    // shrinkage: string;
    @ApiProperty()
    m3FabricCode: number;
    @ApiProperty()
    color: number;
    // @ApiProperty()
    // pch: number;
    // @ApiProperty()
    // moq: number;
    // @ApiProperty()
    // moqUnit: number;
    // @ApiProperty()
    // moqPrice: number;
    // @ApiProperty()
    // moqPriceUnit: number;
    @ApiProperty()
    season: string;
    @ApiProperty()
    supplierId: number;
    @ApiProperty()
    buyerId: number;
    @ApiProperty()
    grnDate: Date;
    @ApiProperty()
    xlNo: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    quantityUnit: number;
    @ApiProperty()
    file_path: string;
    @ApiProperty()
    isUploaded: boolean;
    @ApiProperty()
    remarks: string;
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
    ifabricId: number,
    // content: string,
    // fabricType: string,
    // weaveId: number,
    // weight: number,
    // width: number,
    // yarnCount: number,
    // yarnUnit: number,
    // weightUnit:number,
    // construction: string,
    // finish: string,
    // shrinkage: string,
    m3FabricCode: number,
    color: number,
    // pch: number,
    // moq: number,
    // moqUnit: number,
    // moqPrice: number,
    // moqPriceUnit: number,
    season: string,
    supplierId: number,
    buyerId: number,
    grnDate: Date,
    xlNo: string,
    quantity: number,
    quantityUnit: number,
    file_path: string,
    isUploaded: boolean,
    remarks: string,
    isActive?: boolean,
    createdAt?: Date,
    createdUser?: string | null,
    updatedAt?: Date,
    updatedUser?: string | null,
    versionFlag?: number,
  ){
    this.ifabricId=ifabricId;
    // this.content=content;
    // this.fabricType=fabricType;
    // this.weaveId=weaveId;
    // this.weight=weight;
    // this.width=width;
    // this.yarnCount=yarnCount;
    // this.yarnUnit=yarnUnit;
    // this.weightUnit = weightUnit;
    // this.construction=construction;
    // this.finish=finish;
    // this.shrinkage=shrinkage;
    this.m3FabricCode=m3FabricCode;
    this.color=color;
    // this.pch=pch;
    // this.moq=moq;
    // this.moqUnit=moqUnit;
    // this.moqPrice=moqPrice;
    // this.moqPriceUnit=moqPriceUnit;
    this.season=season;
    this.supplierId=supplierId;
    this.buyerId=buyerId;
    this.grnDate=grnDate;
    this.xlNo=xlNo;
    this.quantity=quantity;
    this.quantityUnit=quantityUnit;
    this.file_path=file_path;
    this.isUploaded=isUploaded;
    this.remarks=remarks;
    this.isActive=isActive;
    this.createdAt=createdAt;
    this.createdUser=createdUser;
    this.updatedAt=updatedAt;
    this.updatedUser=updatedUser;
    this.versionFlag=versionFlag;
  }


}
