import { ApiProperty } from "@nestjs/swagger";

export class IndentTrimsModel{
    itrimsId: number;
    trimType: string;
    trimCode: number;
    size: number;
    color: string;
    quantity: number;
    m3TrimCode: number;
    description: string;
    remarks: string;
    availableQuantity:number;
    quantityUnit:string;
    status:string;
    indentId?:number
    materialType?:string
    buyer?: string
    buyerId?: number
    quantityUnitId?:number;
    styleId?: number;
    checkStatus?: boolean;
    indentTrimId?:number
    m3TrimCodeName?:string
    indentCode?:string
    poQty?:number;
  constructor(
    itrimsId: number,
    trimType: string,
    trimCode: number,
    size: number,
    color: string,
    quantity: number,
    m3TrimCode: number,
    description: string,
    remarks: string,
    availableQuantity:number,
    quantityUnit:string,
    status:string,
    indentId?:number,
    materialType?:string,
    buyer?: string,
    buyerId?: number,
    quantityUnitId?:number,
    styleId?: number,
    checkStatus?: boolean,
    indentTrimId?:number,
    m3TrimCodeName?:string,
    indentCode?:string,
    poQty?:number
  ){
    this.itrimsId = itrimsId;
    this.trimType = trimType;
    this.trimCode = trimCode;
    this.size = size;
    this.color = color;
    this.quantity = quantity;
    this.m3TrimCode = m3TrimCode;
    this.description = description;
    this.remarks = remarks;
    this.availableQuantity = availableQuantity;
    this.quantityUnit=quantityUnit;
    this.status=status;
    this.indentId=indentId
    this.materialType=materialType
    this.buyer = buyer
    this.buyerId = buyerId
    this.quantityUnitId = quantityUnitId
    this.styleId = styleId
    this.checkStatus = checkStatus
    this.indentTrimId = indentTrimId
    this.m3TrimCodeName = m3TrimCodeName
    this.indentCode = indentCode
    this.poQty = poQty


  }


}
