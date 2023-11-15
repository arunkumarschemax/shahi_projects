import { ApiProperty } from "@nestjs/swagger";


export class RequestReq{
    parameter?:string;
    conumber?:string;

    constructor(
        parameter?:string,conumber?:string
    ){
        this.conumber=conumber;
        this.parameter=parameter;
    }
}