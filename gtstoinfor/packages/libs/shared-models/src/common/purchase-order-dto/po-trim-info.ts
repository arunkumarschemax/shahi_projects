import { ApiProperty } from "@nestjs/swagger"

export class PurchaseOrderTrimDto{
    sampleReqTrimId:number
    indentTrimId:number
    poTrimId:number
    colourId:number
    m3TrimCode:string
    description: string
    consumption: number
    remarks: string
    poQuantity:number
    quantityUomId:number

    constructor(
      sampleReqTrimId:number,
       indentTrimId:number,
        colourId:number,
        m3TrimCode:string,
        description: string,
        consumption: number,
        remarks: string,
        poQuantity:number,
        quantityUomId:number
    ){
        this.sampleReqTrimId=sampleReqTrimId
        this.indentTrimId=indentTrimId
        this.colourId=colourId
        this.m3TrimCode=m3TrimCode
        this.description=description
        this.consumption=consumption
        this.remarks=remarks
        this.poQuantity=poQuantity
        this.quantityUomId=quantityUomId
    }

}