import { Destinations } from "./destinations";

export class CoLineRequest {

    buyerPo?: string;
    remarks?: string;
    exFactoryDate?: string;
    deliveryDate?: string;
    destinations?: Destinations[]

    constructor(
        buyerPo?: string, remarks?: string, exFactoryDate?: string, deliveryDate?: string, destinations?: Destinations[]
    ) {
        this.buyerPo = buyerPo;
        this.remarks = remarks;
        this.exFactoryDate = exFactoryDate;
        this.deliveryDate = deliveryDate;
        this.destinations = destinations;
    }
}
