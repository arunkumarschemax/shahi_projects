

export class RackPositionDTO {
    positionId:number;
    rackPositionName: string;
    positionCode: number;
    isActive?:boolean;
    versionFlag?:number;
    

    constructor(positionId:number,rackPositionName: string,
        positionCode: number,
        isActive?:boolean,
        versionFlag?:number,
       
        
        
    ) {
        this.positionId = positionId;
        this.rackPositionName = rackPositionName;
        this.positionCode = positionCode;
        this.isActive = isActive;
        versionFlag = versionFlag;
       
       
    }
}
