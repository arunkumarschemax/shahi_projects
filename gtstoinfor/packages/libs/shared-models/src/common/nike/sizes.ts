export class Sizes {

    name?: string;
    qty?: number;
    price?: number;

    constructor(
        name?: string, qty?: number, price?: number
    ) {
        this.name = name;
        this.qty = qty;
        this.price = price;
    }
}
