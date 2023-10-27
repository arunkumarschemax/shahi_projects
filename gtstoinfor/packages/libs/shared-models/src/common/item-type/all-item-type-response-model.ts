// import { ItemTypeDto } from "./item-type.dto";
// import { GlobalResponseObject } from "../global-response-object";


// export class AllItemTypeResponseModel extends GlobalResponseObject{
//     data?: ItemTypeDto[];
//     constructor(status: boolean, intlCode: number, internalMessage: string, data?: ItemTypeDto[]) {
//         super(status, intlCode, internalMessage);
//         this.data = data;
//     }




// }
import { GlobalResponseObject } from "../global-response-object";
import { ItemTypeDto } from "./item-type.dto";
export class AllItemTypeResponseModel extends GlobalResponseObject{
    data?: ItemTypeDto[];
    constructor(status: boolean, intlCode: number, internalMessage: string, data?: ItemTypeDto[]) {
        super(status, intlCode, internalMessage);
        this.data = data;
    }




}