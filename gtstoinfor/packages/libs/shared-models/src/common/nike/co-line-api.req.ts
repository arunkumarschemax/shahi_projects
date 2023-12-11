import { Destinations } from "./destinations";

export class CoLineRequest {

    buyerPo?: string;
    remarks?: string;
    exFactoryDate?: string;
    deliveryDate?: string;
    salesPrice?: string;
    currency?: string;
    destinations?: Destinations[]

    constructor(
        buyerPo?: string, remarks?: string, exFactoryDate?: string, deliveryDate?: string, salesPrice?: string, currency?: string, destinations?: Destinations[]
    ) {
        this.buyerPo = buyerPo;
        this.remarks = remarks;
        this.exFactoryDate = exFactoryDate;
        this.deliveryDate = deliveryDate;
        this.salesPrice = salesPrice
        this.currency = currency
        this.destinations = destinations;
    }
}
