import { ApiProperty } from "@nestjs/swagger";

export class SampleProcessInfoReq{
    process:string
    description:false
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