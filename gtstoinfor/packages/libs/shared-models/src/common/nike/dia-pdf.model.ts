export class DiaPDFModel {
    shipToAddress: string;
    finalDestination: string;
    cabCode: string;
    poNumber: string;
    lineNo: string;
    constructor(
        shipToAddress?: string,
        finalDestination?: string,
        cabCode?: string,
        poNumber?: string,
        lineNo?: string,
    ) {
        this.shipToAddress = shipToAddress;
        this.finalDestination = finalDestination;
        this.cabCode = cabCode;
        this.poNumber = poNumber;
        this.lineNo = lineNo;
    }
}