export class FactoryReportSizeModel {
    sizeDescription: string;
    sizeQty: number;
    constructor(sizeDescription: string, sizeQty: number) {
        this.sizeQty = sizeQty
        this.sizeDescription = sizeDescription
    };
}