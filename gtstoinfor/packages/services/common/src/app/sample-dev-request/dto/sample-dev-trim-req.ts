import { ApiProperty } from "@nestjs/swagger"

export class SampleTrimReq{
    @ApiProperty()
    trimType:string
    @ApiProperty()
    trimCode:number
    @ApiProperty()
    uomId:number
    @ApiProperty()
    consumption:number
    @ApiProperty()
    remarks:string
    @ApiProperty()
    trimInfoId?:number
    constructor(
        trimType:string,
        trimCode:number,
        uomId:number,
        consumption:number,
        remarks:string,
        trimInfoId?:number
    ){
        this.trimType=trimType
        this.trimCode=trimCode
        this.uomId=uomId
        this.consumption=consumption
        this.remarks=remarks
        this.trimInfoId=trimInfoId
    }

}