export class EddieSizeWiseModel {
    sizeCode:string;
    size: string;
    upc:string;
    sku:string;
    quantityPerInnerPack:string;
    retailPrice:string;
    quantity:string;
    unitCost:string;
    cost:string;
    unit:string;
   

    constructor(
        sizeCode:string,
        size: string,
        upc:string,
        sku:string,
        quantityPerInnerPack:string,
        retailPrice:string,
        quantity:string,
        unitCost:string,
        cost:string,
        unit:string,
       
        

    ) {

        this.sizeCode = sizeCode
        this.size = size
        this.upc = upc
        this.sku = sku
        this.quantityPerInnerPack = quantityPerInnerPack
        this.retailPrice = retailPrice
        this.quantity = quantity
        this.unitCost = unitCost
        this.cost = cost
        this.unit=unit
        

    };
}