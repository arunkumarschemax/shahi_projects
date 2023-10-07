import { ApiProperty } from "@nestjs/swagger"

export class SampleTrimReq{
    description:string
    consumption:number
    remarks:string
    trimInfoId?:number
    constructor(
        description:string,
        consumption:number,
        remarks:string,
        trimInfoId?:number
    ){
        this,description=description
        this.consumption=consumption
        this.remarks=remarks
        this.trimInfoId=trimInfoId
    }

}