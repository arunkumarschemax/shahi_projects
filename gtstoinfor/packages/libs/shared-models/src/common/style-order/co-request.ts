export class CoRequest{
    coLineId?:number;
    coId?:number;
    coNumber?:string;
    parameter?:string;
    constructor(coLineId?:number,coId?:number,coNumber?:string, parameter?:string){
        this.coId=coId;
        this.coLineId=coLineId;
        this.coNumber=coNumber;
        this.parameter=parameter;
    }
}