export class IndentRequestFilter{
    requestNo?:string;
    style?: number;
    status?: string
    extRefNumber?: string

    
    constructor( requestNo?:string, style?: number,status?: string,extRefNumber?: string){
        this.requestNo = requestNo;
        this.style = style;
        this.status=status;
        this.extRefNumber=extRefNumber;

    }
}