import { LevelsDto } from "./level.dto";
import { GlobalResponseObject } from "../global-response-object";


export class LevelResponseModel extends GlobalResponseObject{
    data?: LevelsDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: LevelsDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }
}