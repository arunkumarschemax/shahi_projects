export class SanmarCoLinereqModels {
    buyerPo: string;
    style:string;
    salesPrice: string;
    deliveryDate: any;
    currency:string;
    destinations: SanmarDestinationModel[]

    constructor(buyerPo: string, style: string, salesPrice: string,deliveryDate: any, currency:string, destinations: SanmarDestinationModel[]) {
        this.buyerPo = buyerPo
        this.style = style
        this.salesPrice = salesPrice
        this.deliveryDate = deliveryDate
        this.currency = currency
        this.destinations = destinations
    }
}

export class SanmarDestinationModel {
    name: string;
    colors: SanmarColorModel[]

    constructor(name: string, colors: SanmarColorModel[]) {
        this.name = name
        this.colors = colors
    }
}

export class SanmarColorModel {
    name: string;
    sizes: SanmarSizeModel[]
    constructor(name: string, sizes: SanmarSizeModel[]) {
        this.name = name
        this.sizes = sizes
    }
}

export class SanmarSizeModel {
    name: string;
    qty: string;
    price: string;

    constructor(name: string, qty: string, price: string) {
        this.name = name
        this.qty = qty
        this.price = price
    }
}