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
    totalQuantity?:string;

    constructor(purchaseOrderNumber: string,
        id:number,
        sizeDescription: string,
        sizeQuantity: number,
        legalPoQty: number,
        grossPriceFOB: string,
        FOBCurrencyCode: string,
        legalPoPrice: number,
        legalPoCurrency: string,poAndLine: string,totalQuantity?:string) {

        this.purchaseOrderNumber = purchaseOrderNumber
        this.poAndLine = poAndLine
        this.totalQuantity =totalQuantity
        this.id = id;
        this.sizeDescription = sizeDescription
        this.sizeQuantity = sizeQuantity
        this.legalPoQty = legalPoQty
        this.grossPriceFOB = grossPriceFOB
        this.FOBCurrencyCode = FOBCurrencyCode
        this.legalPoPrice = legalPoPrice
        this.legalPoCurrency = legalPoCurrency
        
    };
}


