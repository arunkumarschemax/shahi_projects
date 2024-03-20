import { ActionEnum } from "../../Enum/z-factors-Enum";
import { zFactorsBomDTO } from "./z-factors-bom-dto";

export class zFactorsDTO {

    id: number;
    itemId: number;
    actualIM:string;
    action: ActionEnum;
    geoCode: boolean;
    destination: boolean;
    size:boolean;
    gender:boolean;
    plant:boolean;
    style:boolean;
    zFactorBomDetails:zFactorsBomDTO[];
}