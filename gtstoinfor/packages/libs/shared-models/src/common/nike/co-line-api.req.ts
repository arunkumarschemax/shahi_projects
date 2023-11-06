import { Destinations } from "./destinations";

export class CoLineRequest {

    buyerPo?: string;
    remarks?: string;
    deliveryDate?: string;
    destinations?: Destinations[]

    constructor(
        buyerPo?: string, remarks?: string, deliveryDate?: string, destinations?: Destinations[]
    ) {
        this.buyerPo = buyerPo;
        this.remarks = remarks;
        this.deliveryDate = deliveryDate;
        this.destinations = destinations;
    }
}
