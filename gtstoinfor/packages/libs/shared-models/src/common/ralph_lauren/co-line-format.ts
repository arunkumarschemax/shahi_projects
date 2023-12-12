export class CoLineModel {
    buyerPo: string;
    itemNumber:number;
    salesPrice: string;
    currency: string;
    deliveryDate: any;
    destinations: Destination[]

    constructor(buyerPo: string, itemNumber: number, salesPrice: string, currency: string, deliveryDate: any, destinations: Destination[]) {
        this.buyerPo = buyerPo
        this.itemNumber = itemNumber
        this.salesPrice = salesPrice
        this.currency = currency
        this.deliveryDate = deliveryDate
        this.destinations = destinations
    }
}

export class Destination {
    name: string;
    colors: Color[]

    constructor(name: string, colors: Color[]) {
        this.name = name
        this.colors = colors
    }
}

export class Color {
    name: string;
    sizes: Size[]
    constructor(name: string, sizes: Size[]) {
        this.name = name
        this.sizes = sizes
    }
}

export class Size {
    name: string;
    qty: number;
    price: string;

    constructor(name: string, qty: number, price: string) {
        this.name = name
        this.qty = qty
        this.price = price
    }
}