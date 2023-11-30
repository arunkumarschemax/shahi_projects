export class GrnReq {
    grnId: number;
    itemType: string
    constructor(
        grnId: number,
        itemType: string
    ) {
        this.grnId = grnId;
        this.itemType = itemType
    }
}

