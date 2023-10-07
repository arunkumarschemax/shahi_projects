import { ApiProperty } from "@nestjs/swagger"

export class SampleTrimReq{
    @ApiProperty()
    description:string
    @ApiProperty()
    consumption:number
    @ApiProperty()
    remarks:string
    @ApiProperty()
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