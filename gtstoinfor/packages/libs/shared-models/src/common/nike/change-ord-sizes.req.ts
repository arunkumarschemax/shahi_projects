import { PoChangeSizeModel } from "./pochange-qty.model";

export class OrderChangePoModel {
    purchaseOrderNumber: string;
    id:number;
    sizeDescription: string;
    sizeQuantity: number;
    legalPoQty: number;
    grossPriceFOB: string;
    FOBCurrencyCode: string;
    legalPoPrice: number;
    legalPoCurrency: string;
    poAndLine: string;
    quantityDifference:number;
    priceDifferance:number;
    constructor(purchaseOrderNumber: string,
        id:number,
        sizeDescription: string,
        sizeQuantity: number,
        legalPoQty: number,
        grossPriceFOB: string,
        FOBCurrencyCode: string,
        legalPoPrice: number,
        legalPoCurrency: string,poAndLine: string,quantityDifference:number,    priceDifferance:number        ) {

        this.purchaseOrderNumber = purchaseOrderNumber
        this.poAndLine = poAndLine
        this.id = id;
        this.sizeDescription = sizeDescription
        this.sizeQuantity = sizeQuantity
        this.legalPoQty = legalPoQty
        this.grossPriceFOB = grossPriceFOB
        this.FOBCurrencyCode = FOBCurrencyCode
        this.legalPoPrice = legalPoPrice
        this.legalPoCurrency = legalPoCurrency
        this.quantityDifference = quantityDifference
        this.priceDifferance = priceDifferance
        
    };
}


