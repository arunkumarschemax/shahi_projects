import { RackPositionStatusEnum } from "../../enum/rack-position-enum";

export class RackPositionRequest {
    positionId:number;
    rackPositionName:string;
    positionCode: number;
    rackName:string;
    status: RackPositionStatusEnum;

}