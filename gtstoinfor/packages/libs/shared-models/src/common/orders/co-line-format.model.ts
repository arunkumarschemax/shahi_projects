export class CoLineFormatModel{
    buyerPo: string;
    itemNumber: string;
    remarks: string;
    deliveryDate : any;
    destinations: Destinations[]

    constructor(buyerPo: string,itemNumber: string,remarks: string,deliveryDate : any,destinations: Destinations[]){
        this.buyerPo = buyerPo
        this.itemNumber = itemNumber
        this.remarks = remarks
        this.deliveryDate = deliveryDate
        this.destinations = destinations
    }
}

export class Destinations{
    name: string;
    colors: Colors[]

    constructor(name:string,colors: Colors[]){
        this.name = name
        this.colors = colors
    }
}

export class Colors{
    name:string;
    sizes:Sizes[]
    constructor(name:string,sizes:Sizes[]){
        this.name = name
        this.sizes = sizes
    }
}

export class Sizes{
    name:string;
    qty: number;
    price:number;

    constructor(name:string,qty:number,price:number){
        this.name = name
        this.qty = qty
        this.price = price
    }
}