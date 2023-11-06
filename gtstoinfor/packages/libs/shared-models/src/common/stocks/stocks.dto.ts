export class StocksDto {
    id: number;
    m3ItemCode: string;
    shahiItemCode: string;
    itemType: number;
    location: number;
    plant: number;
    quantity: string;
    constructor(id: number, m3ItemCode: string, shahiItemCode: string, itemType: number, location: number, plant: number, quantity: string) {
        this.id = id;
        this.m3ItemCode = m3ItemCode;
        this.shahiItemCode = shahiItemCode;
        this.location = location;
        this.itemType = itemType;
        this.plant = plant;
        this.quantity = quantity;
    }
}