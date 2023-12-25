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
    m3FabricCode: number;
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
    styleId?: number
    checkStatus?: boolean
    indentCode?: string
    itemCode?:string
    colorName?:string
    indentQuantity?:number
    poQuantity?:number
    quantityUom?:string
    colorId?:number
    indentFabricId?:number
    m3FabricCodeName?:string
    quantityUomId?:number
    poQty?:number
    fabricCode?:string

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
    m3FabricCode: number,
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
    buyerId?:number,
    styleId?: number,
    checkStatus?: boolean,
    indentCode?: string,
    itemCode?:string,
    colorName?:string,
    indentQuantity?:number,
    poQuantity?:number,
    quantityUom?:string,
    colorId?:number,
    indentFabricId?:number,
    m3FabricCodeName?:string,
    quantityUomId?:number,
    poQty?:number,
    fabricCode?:string
 
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
    this.styleId = styleId
    this.checkStatus = checkStatus
    this.indentCode =indentCode
    this.itemCode =itemCode
    this.colorName =colorName
    this.indentQuantity = indentQuantity
    this.poQuantity = poQuantity
    this.quantityUom = quantityUom
    this.colorId = colorId
    this.indentFabricId =indentFabricId
    this.m3FabricCodeName = m3FabricCodeName
    this.quantityUomId = quantityUomId
    this.poQty = poQty
    this.fabricCode = fabricCode
  }


}
