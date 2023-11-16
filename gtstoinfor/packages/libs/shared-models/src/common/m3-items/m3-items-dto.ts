

export class M3ItemsDTO {
    m3ItemsId:number;
    itemCode:string;
    content: string;
    fabricType:number;
    weave: number;
    weight:number;
    weightUnit:string;
    construction: string;
    yarnCount: string;
    yarnUnit: string;
    finish: string;
    shrinkage: string;
    isActive?:boolean;
    versionFlag?:number;
    

    constructor(m3ItemsId:number,itemCode:string,content: string,
        fabricType:number,weave: number,
        weight:number,weightUnit:string,construction: string,
        yarnCount: string,yarnUnit: string,finish: string,
        shrinkage: string,
        isActive?:boolean,
        versionFlag?:number,
       
        
        
    ) {
        this.m3ItemsId = m3ItemsId;
        this.itemCode = itemCode;
        this.content = content;
        this.fabricType = fabricType;
        this.weave = weave;
        this.weight = weight;
        this.weightUnit = weightUnit;
        this.construction = construction;
        this.yarnCount = yarnCount;
        this.yarnUnit = yarnUnit;
        this.finish = finish;
        this.shrinkage = shrinkage;
        this.isActive = isActive;
        versionFlag = versionFlag;
       
       
    }
}
