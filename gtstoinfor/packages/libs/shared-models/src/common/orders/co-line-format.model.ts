export class CoLineFormatModel{
    orderPlanNumber: string;
    itemNumber: string;
    deliveryDate : any;
    destinations: Destinations[]

    constructor(orderPlanNumber: string,itemNumber: string,deliveryDate : any,destinations: Destinations[]){
        this.orderPlanNumber = orderPlanNumber
        this.itemNumber = itemNumber
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