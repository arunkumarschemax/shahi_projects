import { CommonRequestAttrs } from "../common-request-attr.model";

export class PalletIdRequest {
    palletId: number;
    palletCode: string;
    constructor(palletId: number,palletCode: string) {
        this.palletId = palletId;
        this.palletCode = palletCode;
    }
}   