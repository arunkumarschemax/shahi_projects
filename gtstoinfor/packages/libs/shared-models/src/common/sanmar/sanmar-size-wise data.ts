export class SanmarSizeWiseModel {

    size: string;
    unitPrice: string;
    quantity:string;
    color?:string;
    unit?:string

    constructor(
        size: string,
        unitPrice: string,
        quantity:string,
        color?:string,
        unit?:string
        

    ) {

        this.size = size
        this.unitPrice = unitPrice
        this.quantity=quantity
        this.color=color
        this.unit = unit

    };
}