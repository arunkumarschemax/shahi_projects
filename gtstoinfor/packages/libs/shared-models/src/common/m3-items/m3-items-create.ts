import { m3ItemsContentEnum } from "../../enum";

export class M3ItemsCreateRequest {
    m3ItemsId:number;
    itemCode:string;
    content: m3ItemsContentEnum;
    fabricType:number;
    weave: number;
    weight:number;
    weightUnit:string;
    construction: string;
    yarnCount: string;
    yarnUnit: string;
    width:number;
    widthUnit:string;
    finish: string;
    shrinkage: string;


}