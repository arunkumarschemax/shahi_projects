import { RackPositionStatusEnum } from "../../enum/rack-position-enum";


export class RackPositionDTO {
    positionId:number;
    rackPositionName: string;
    positionCode: number;
    rackName: string;
    status: RackPositionStatusEnum;
    isActive?:boolean;
    versionFlag?:number;
    

    constructor(positionId:number,rackPositionName: string,
        positionCode: number,
        rackName: string,
        status: RackPositionStatusEnum,
        isActive?:boolean,
        versionFlag?:number,
       
        
        
    ) {
        this.positionId = positionId;
        this.rackPositionName = rackPositionName;
        this.positionCode = positionCode;
        this.rackName = rackName;
        this.isActive = isActive;
        versionFlag = versionFlag;
       
       
    }
}
