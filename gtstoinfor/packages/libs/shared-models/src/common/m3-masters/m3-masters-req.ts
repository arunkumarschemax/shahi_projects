export class M3MastersReq{
    category : string;
    m3Code: string;
    m3Id: number;

    constructor(category:string,m3Code:string,m3Id:number){
        this.category = category;
        this.m3Code = m3Code;
        this.m3Id = m3Id;
    }
}