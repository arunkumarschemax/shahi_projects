export class LevisSizeWiseModel {

    product: string;
    size: string;
    upc: string;
    plannedExFactoryDate: string;
    exFactoryDate: string;
    quantity: string;
    unitPrice: string;
    


    constructor(

        product: string,
        size: string,
        upc: string,
        plannedExFactoryDate: string,
        exFactoryDate: string,
        quantity: string,
        unitPrice: string,



    ) {


        this.product = product
        this.size = size
        this.plannedExFactoryDate = plannedExFactoryDate
        this.exFactoryDate = exFactoryDate
        this.upc = upc
        this.quantity = quantity
        this.unitPrice = unitPrice

    };
}