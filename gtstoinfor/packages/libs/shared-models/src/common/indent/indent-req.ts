export class IndentReq{
    requestNo:string;
    indentDate:string;
    constructor(
        requestNo:string ,
        indentDate:string
        
    ){
        this.requestNo = requestNo;
        this.indentDate = indentDate;
    }
}
