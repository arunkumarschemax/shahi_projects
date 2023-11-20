export class IndentRequestFilter{
    requestNo?:string;
    style?: number;
    status?: string

    
    constructor( requestNo?:string, style?: number,status?: string){
        this.requestNo = requestNo;
        this.style = style;
        this.status=status;

    }
}