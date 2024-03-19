export class PvhSizeWiseModel {

    product: string;
    size: string;
    upc: string;
    plannedExFactoryDate: string;
    exFactoryDate: string;
    quantity: string;
    unitPrice: string;
    itemNo?:string;
    color?:string;
    


    constructor(

        product: string,
        size: string,
        upc: string,
        plannedExFactoryDate: string,
        exFactoryDate: string,
        quantity: string,
        unitPrice: string,
        itemNo?:string,
        color?:string,



    ) {


        this.product = product
        this.size = size
        this.plannedExFactoryDate = plannedExFactoryDate
        this.exFactoryDate = exFactoryDate
        this.upc = upc
        this.quantity = quantity
        this.unitPrice = unitPrice
        this.itemNo=itemNo
        this.color=color

    };
}