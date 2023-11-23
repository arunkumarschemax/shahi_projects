import { ApiProperty } from "@nestjs/swagger"

export class SamplefabricReq{
    @ApiProperty()
    fabricCode:number
    @ApiProperty()
    uomId:number
    @ApiProperty()
    colourId:number
    @ApiProperty()
    consumption?:number
    @ApiProperty()
    remarks : string
    @ApiProperty()
    fabricInfoId:number;
    constructor(
        fabricCode:number,
        uomId:number,
        colourId:number,
        consumption:number,
        remarks : string,
        fabricInfoId?:number
    ){
        this.fabricCode=fabricCode
        this.colourId=colourId
        this,uomId=uomId
        this.consumption=consumption
        this.remarks=remarks
        this.fabricInfoId=fabricInfoId
    }

}