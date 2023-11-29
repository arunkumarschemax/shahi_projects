import { RackPositionStatusEnum } from "../../enum/rack-position-enum";


export class RackPositionDTO {
    positionId:number;
    rackPositionName: string;
    columnId: number;
    levelId: number;
    positionCode: number;
    rackName: string;
    status: RackPositionStatusEnum;
    isActive?:boolean;
    versionFlag?:number;
    

    constructor(positionId:number,rackPositionName: string,
        columnId: number,
        positionCode: number,
        levelId: number,
        rackName: string,
        status: RackPositionStatusEnum,
        isActive?:boolean,
        versionFlag?:number,
       
        
        
    ) {
        this.positionId = positionId;
        this.rackPositionName = rackPositionName;
        this.positionCode = positionCode;
        this.columnId = columnId
        this.levelId = levelId
        this.rackName = rackName;
        this.status = status
        this.isActive = isActive;
        this.versionFlag = versionFlag;
       
       
    }
}
