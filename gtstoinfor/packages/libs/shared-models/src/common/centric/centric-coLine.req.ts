export class centricCoLineRequest {

    poNumber?: string;
    itemNo?: string;
    poLine?: string;



    constructor(
        poNumber?: string, itemNo?: string, poLine?: string,

    ) {

        this.poNumber = poNumber;
        this.itemNo = itemNo;
        this.poLine = poLine
    }
}
