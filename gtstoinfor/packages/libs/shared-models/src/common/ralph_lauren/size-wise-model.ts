export class OrderSizeWiseModel {
    size: string;
    TotalQty: number;
    msrpPrice: string;
    mrspCurrency:string;
    csprice:string;
    csCurrency:string;
    amount:string;
    totalAmount:string;
    price:string;
    currency:string;
    quantity:string;
    upcEan:string

    constructor(
        size: string,
    TotalQty: number,
    msrpPrice: string,
    mrspCurrency:string,
    csprice:string,
    csCurrency:string,
    amount:string,
    totalAmount:string,
    price:string,
    currency:string,
    quantity:string,
    upcEan:string
    ) {
        this.size = size
        this.TotalQty = TotalQty
        this.msrpPrice = msrpPrice
        this.mrspCurrency = mrspCurrency
        this.csprice = csprice
        this.csCurrency = csCurrency
        this.amount = amount
        this.totalAmount = totalAmount
        this.price = price
        this.currency = currency
        this.quantity = quantity
        this.upcEan = upcEan
    };
}