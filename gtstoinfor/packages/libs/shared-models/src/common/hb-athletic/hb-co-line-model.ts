export class HBCoLinereqModels {
    buyerPo: string;
    style:string;
    salesPrice: string;
    deliveryDate: any;
    currency:string
    destinations: HBDestinationModel[]

    constructor(buyerPo: string, style: string, salesPrice: string,deliveryDate: any, currency:string, destinations: HBDestinationModel[]) {
        this.buyerPo = buyerPo
        this.style = style
        this.salesPrice = salesPrice
        this.deliveryDate = deliveryDate
        this.currency = currency
        this.destinations = destinations
    }
}

export class HBDestinationModel {
    name: string;
    colors: HBColorModel[]

    constructor(name: string, colors: HBColorModel[]) {
        this.name = name
        this.colors = colors
    }
}

export class HBColorModel {
    name: string;
    sizes: HBSizeModel[]
    constructor(name: string, sizes: HBSizeModel[]) {
        this.name = name
        this.sizes = sizes
    }
}

export class HBSizeModel {
    name: string;
    qty: string;
    price: string;

    constructor(name: string, qty: string, price: string) {
        this.name = name
        this.qty = qty
        this.price = price
    }
}