export class FactoryReportSizeModel {
    sizeDescription: string;
    sizeQty: number;
    price: number;
    coPrice: number;
    constructor(sizeDescription: string, sizeQty: number,  price: number,coPrice: number) {
        this.sizeQty = sizeQty
        this.sizeDescription = sizeDescription
        this.price = price
        this.coPrice = coPrice
    };
}