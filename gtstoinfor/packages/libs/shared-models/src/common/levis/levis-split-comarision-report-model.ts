export class LevisSplitCompareModel {

    poNumber: string;
    splitPo: string;
    po_line: number;
    size: string;
    totalQuantity: number;
    splitPoTotalQuantity: number;

    constructor(poNumber: string,splitPo:string, po_line: number, size: string,
        totalQuantity: number,
        splitPoTotalQuantity: number,

    ) {

        this.poNumber = poNumber
        this.splitPo = splitPo
        this.po_line = po_line
        this.size = size
        this.totalQuantity = totalQuantity
        this.splitPoTotalQuantity = splitPoTotalQuantity

    }

}