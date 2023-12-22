export class IndentRequestFilter{
    requestNo?:string;
    style?: number;
    status?: string
    extRefNumber?: string
tab?:string
    
    constructor( requestNo?:string, style?: number,status?: string,extRefNumber?: string,tab?:string){
        this.requestNo = requestNo;
        this.style = style;
        this.status=status;
        this.extRefNumber=extRefNumber;
        this.tab = tab

    }
}