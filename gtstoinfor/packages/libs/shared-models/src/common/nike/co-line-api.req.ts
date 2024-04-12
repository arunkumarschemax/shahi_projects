import { Destinations } from "./destinations";

export class CoLineRequest {

    buyerPo?: string;
    remarks?: string;
    exFactoryDate?: string;
    deliveryDate?: string;
    salesPrice?: number;
    currency?: string;
    destinations?: Destinations[]
    coNumber?:string

    constructor(
        buyerPo?: string, remarks?: string, exFactoryDate?: string, deliveryDate?: string, salesPrice?: number, currency?: string, destinations?: Destinations[],coNumber?:string
    ) {
        this.buyerPo = buyerPo;
        this.remarks = remarks;
        this.exFactoryDate = exFactoryDate;
        this.deliveryDate = deliveryDate;
        this.salesPrice = salesPrice
        this.currency = currency
        this.destinations = destinations;
        this.coNumber = coNumber
    }
}
