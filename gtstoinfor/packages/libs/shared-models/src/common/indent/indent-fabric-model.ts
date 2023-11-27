import { ApiProperty } from "@nestjs/swagger";
import { CustomerOrderStatusEnum } from "@project-management-system/shared-models";

export class IndentFabricModel{
    ifabricId: number;
    content: string;
    fabricType: string;
    weave: string;
    weight: number;
    width: number;
    yarnCount: number;
    unit: number;
    construction: string;
    finish: string;
    shrinkage: string;
    m3FabricCode: string;
    color: string;
    pch: number;
    moq: number;
    moqUnit: string;
    moqPrice: number;
    moqPriceUnit: string;
    season: string;
    supplierId: string;
    buyer: string;
    grnDate: Date;
    xlNo: string;
    quantity: number;
    quantityUnit: string;
    status:string;
    indentId?:number
    materialType?:string
    description?: string
    buyerId?:number

  constructor(
    ifabricId: number,
    content: string,
    fabricType: string,
    weave: string,
    weight: number,
    width: number,
    yarnCount: number,
    unit: number,
    construction: string,
    finish: string,
    shrinkage: string,
    m3FabricCode: string,
    color: string,
    pch: number,
    moq: number,
    moqUnit: string,
    moqPrice: number,
    moqPriceUnit: string,
    season: string,
    supplierId: string,
    buyer: string,
    grnDate: Date,
    xlNo: string,
    quantity: number,
    quantityUnit: string,
    status:string,
    indentId?:number,
    materialType?:string,
    description?: string,
    buyerId?:number
 
  ){
    this.ifabricId=ifabricId;
    this.content=content;
    this.fabricType=fabricType;
    this.weave=weave;
    this.weight=weight;
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
    this.buyer=buyer;
    this.grnDate=grnDate;
    this.xlNo=xlNo;
    this.quantity=quantity;
    this.quantityUnit=quantityUnit;
    this.status=status;
    this.indentId=indentId;
    this.materialType=materialType
    this.description = description
    this.buyerId = buyerId
  }


}
