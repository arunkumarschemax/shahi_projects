export class CoLinereqModel {
    buyerPo: string;
    itemNumber:string;
    salesPrice: string;
    currency: string;
    deliveryDate: any;
    destinations: DestinationModel[]

    constructor(buyerPo: string, itemNumber: string, salesPrice: string, currency: string, deliveryDate: any, destinations: DestinationModel[]) {
        this.buyerPo = buyerPo
        this.itemNumber = itemNumber
        this.salesPrice = salesPrice
        this.currency = currency
        this.deliveryDate = deliveryDate
        this.destinations = destinations
    }
}

export class DestinationModel {
    name: string;
    colors: ColorModel[]

    constructor(name: string, colors: ColorModel[]) {
        this.name = name
        this.colors = colors
    }
}

export class ColorModel {
    name: string;
    sizes: SizeModel[]
    constructor(name: string, sizes: SizeModel[]) {
        this.name = name
        this.sizes = sizes
    }
}

export class SizeModel {
    name: string;
    qty: string;
    price: string;

    constructor(name: string, qty: string, price: string) {
        this.name = name
        this.qty = qty
        this.price = price
    }
}