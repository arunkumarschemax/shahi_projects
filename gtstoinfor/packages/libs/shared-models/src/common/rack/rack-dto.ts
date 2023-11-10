

export class RackDTO {
    rackId:number;
    rackName: string;
    rackCode: number;
    unit: string;
    rackType: string;
    isActive?:boolean;
    versionFlag?:number;
    

    constructor(rackId:number,rackName: string,
        rackCode: number,
        unit: string,
        rackType: string,
        isActive?:boolean,
        versionFlag?:number,
       
        
        
    ) {
        this.rackId = rackId;
        this.rackName = rackName;
        this.rackCode = rackCode;
        this.unit = unit;
        this.rackType = rackType;
        this.isActive = isActive;
        versionFlag = versionFlag;
       
       
    }
}
