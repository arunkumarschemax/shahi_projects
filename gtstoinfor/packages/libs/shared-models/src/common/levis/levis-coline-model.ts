export class LevisCoLinereqModel {
    poNumber: string;
    salesPrice: string;
    currency: string;
    deliveryDate: any;
    destinations: LevisDestinationModel[]

    constructor(poNumber: string, salesPrice: string, currency: string, deliveryDate: any, destinations: LevisDestinationModel[]) {
        this.poNumber = poNumber
        this.salesPrice = salesPrice
        this.currency = currency
        this.deliveryDate = deliveryDate
        this.destinations = destinations
    }
}

export class LevisDestinationModel {
    name: string;
    colors: LevisColorModel[]

    constructor(name: string, colors: LevisColorModel[]) {
        this.name = name
        this.colors = colors
    }
}

export class LevisColorModel {
    name: string;
    sizes: LevisSizeModel[]
    constructor(name: string, sizes: LevisSizeModel[]) {
        this.name = name
        this.sizes = sizes
    }
}

export class LevisSizeModel {
    name: string;
    qty: string;
    price: string;

    constructor(name: string, qty: string, price: string) {
        this.name = name
        this.qty = qty
        this.price = price
    }
}