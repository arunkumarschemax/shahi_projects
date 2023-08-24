export class DiaPDFModel {
    shipToAddress: string;
    cabCode: string;
    poNumber: string;
    lineNo: string;
    constructor(
        shipToAddress?: string,
        cabCode?: string,
        poNumber?: string,
        lineNo?: string,
    ) {
        this.shipToAddress = shipToAddress;
        this.cabCode = cabCode;
        this.poNumber = poNumber;
        this.lineNo = lineNo;
    }
}