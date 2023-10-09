import { ApiProperty } from "@nestjs/swagger"

export class SamplefabricReq{
    fabricCode:string
    description:number
    colourId:number
    consumption?:number
    remarks : string
    fabricInfoId:number;
    constructor(
        fabricCode:string,
        description:number,
        colourId:number,
        consumption:number,
        remarks : string,
        fabricInfoId?:number
    ){
        this.fabricCode=fabricCode
        this.colourId=colourId
        this,description=description
        this.consumption=consumption
        this.remarks=remarks
        this.fabricInfoId=fabricInfoId
    }

}