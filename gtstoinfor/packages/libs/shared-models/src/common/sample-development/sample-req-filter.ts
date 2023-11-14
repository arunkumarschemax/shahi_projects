

export class SampleRequestFilter{
    requestNo?:string;
    buyers?: number

    
    constructor( requestNo?:string, buyers?: number){
        this.requestNo = requestNo;
        this.buyers = buyers

    }
}
