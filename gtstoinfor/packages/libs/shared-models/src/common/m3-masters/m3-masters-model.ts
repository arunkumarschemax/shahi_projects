export class M3MastersModel{
    m3Id: number;
    category : string;
    m3Code: string;
    isActive:boolean;
    versionFlag:number;
    

    constructor(m3Id:number,category:string,m3Code:string,isActive:boolean,versionFlag:number){
        this.m3Id = m3Id;
        this.category = category;
        this.m3Code = m3Code;
        this.isActive = isActive;
        this.versionFlag = versionFlag;
    }
}