import { GlobalResponseObject } from "../global-response-object";
import { CoLineModel} from "./co-line.model";


export class CoLineResponseModel extends GlobalResponseObject {
    data?: CoLineModel[];

    constructor(status: boolean, intlCode: number, internalMessage: string, data?: CoLineModel[]){
        super(status,intlCode,internalMessage);
        this.data = data;
    }
}

