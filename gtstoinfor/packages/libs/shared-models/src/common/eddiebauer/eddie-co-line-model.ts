export class EddieCoLinereqModels {
    poNumber: string;
    poLine:string;
    salesPrice: string;
    deliveryDate: any;
    currency:string;
    style:string;
    destinations: EddieDestinationModel[]

    constructor(poNumber: string,poLine:string ,salesPrice: string,deliveryDate: any, currency:string,style:string, destinations: EddieDestinationModel[]) {
        this.poNumber = poNumber
        this.poLine = poLine
        this.salesPrice = salesPrice
        this.deliveryDate = deliveryDate
        this.currency = currency
        this.style = style
        this.destinations = destinations
    }
}

export class EddieDestinationModel {
    name: string;
    colors: EddieColorModel[]

    constructor(name: string, colors: EddieColorModel[]) {
        this.name = name
        this.colors = colors
    }
}

export class EddieColorModel {
    name: string;
    sizes: EddieSizeModel[]
    constructor(name: string, sizes: EddieSizeModel[]) {
        this.name = name
        this.sizes = sizes
    }
}

export class EddieSizeModel {
    name: string;
    qty: string;
    price: string;

    constructor(name: string, qty: string, price: string) {
        this.name = name
        this.qty = qty
        this.price = price
    }
}