

export class M3ItemsDTO {
    itemCode:number;
    content: string;
    fabricType:string;
    weave: string;
    weight:number;
    construction: string;
    yarnCount: string;
    finish: string;
    shrinkage: string;
    isActive?:boolean;
    versionFlag?:number;
    

    constructor(itemCode:number,content: string,
        fabricType:string,weave: string,
        weight:number,construction: string,
        yarnCount: string,finish: string,
        shrinkage: string,
        isActive?:boolean,
        versionFlag?:number,
       
        
        
    ) {
        this.itemCode = itemCode;
        this.content = content;
        this.fabricType = fabricType;
        this.weave = weave;
        this.weight = weight;
        this.construction = construction;
        this.yarnCount = yarnCount;
        this.finish = finish;
        this.shrinkage = shrinkage;
        this.isActive = isActive;
        versionFlag = versionFlag;
       
       
    }
}
