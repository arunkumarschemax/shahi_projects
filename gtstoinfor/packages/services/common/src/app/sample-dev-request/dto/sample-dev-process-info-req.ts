import { ApiProperty } from "@nestjs/swagger";

export class SampleProcessInfoReq{
    @ApiProperty()
    process:string
    @ApiProperty()
    description:false
    @ApiProperty()
    processInfoId?:number
    constructor(
        process:string,
        description:false,
        processInfoId?:number,
    ){
        this.process=process
        this.description=description
        this.processInfoId=processInfoId
    }

}