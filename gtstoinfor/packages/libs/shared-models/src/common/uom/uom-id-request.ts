import { CommonRequestAttrs } from "../../common";


export class UomIdRequest extends CommonRequestAttrs {
    uomId: number;
    versionFlag?: number;
    isActive?: boolean;
    constructor(uomId: number, username: string,versionFlag?: number, isActive?: boolean) {
        super(username)
        this.uomId = uomId;
        this.versionFlag = versionFlag;
        this.isActive = isActive;
    }
}