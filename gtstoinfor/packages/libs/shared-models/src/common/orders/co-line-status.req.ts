export class CoLineStatusReq{
    coLineId?:number;
    status?: string;

    constructor(coLineId?:number,status?:string){
        this.coLineId = coLineId;
        this.status = status;
    }
}