import { RackEnum } from "../../enum";

export class RackCreateRequest {
    rackId:number;
    rackName:string;
    rackCode: number;
    unit: string;
    rackType: RackEnum;

}