export class ordersMailFileStatusArrayReq{
    fileName: string;
    status: string;
    reason?: string;
    columns?: string;

    constructor(fileName: string,status: string,reason?: string,columns?: string){
        this.fileName = fileName
        this.status = status
        this.reason = reason
        this.columns = columns
    }

}