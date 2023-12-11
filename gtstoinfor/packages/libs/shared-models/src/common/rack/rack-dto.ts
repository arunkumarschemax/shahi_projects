import { RackEnum } from "../../enum";


export class RackDTO {
    rackId:number;
    rackName: string;
    rackCode: string;
    unit: string;
    rackType: RackEnum;
    levels:number
    columns:number
    priority:number
    barcodeId: string;
    isActive?:boolean;
    versionFlag?:number;
    

    constructor(rackId:number,rackName: string,
        rackCode: string,
        unit: string,
        rackType: RackEnum,
        levels:number,
        columns:number,
        priority:number,
        barcodeId: string,
        isActive?:boolean,
        versionFlag?:number,
       
        
        
    ) {
        this.rackId = rackId;
        this.rackName = rackName;
        this.rackCode = rackCode;
        this.unit = unit;
        this.rackType = rackType;
        this.levels = levels;
        this.columns = columns;
        this.priority = priority;
        this.barcodeId = barcodeId;
        this.isActive = isActive;
        versionFlag = versionFlag;
       
       
    }
}
