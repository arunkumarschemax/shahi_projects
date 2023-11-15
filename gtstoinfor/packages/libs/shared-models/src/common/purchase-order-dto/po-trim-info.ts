import { ApiProperty } from "@nestjs/swagger"

export class PurchaseOrderTrimDto{
    poTrimId:number
    productGroupId:number
    trimId:number
    colourId:number
    m3TrimCode:string
    description: string
    consumption: number
    remarks: string
    indentTrimId:number
    poQuantity:string

    constructor(
        productGroupId:number,
        trimId:number,
        colourId:number,
        m3TrimCode:string,
        description: string,
        consumption: number,
        remarks: string,
        indentTrimId:number,
        poQuantity:string


    ){
        this.productGroupId=productGroupId
        this.trimId=trimId
        this.colourId=colourId
        this.m3TrimCode=m3TrimCode
        this.description=description
        this.consumption=consumption
        this.remarks=remarks
        this.indentTrimId=indentTrimId
        this.poQuantity=poQuantity
    }

}