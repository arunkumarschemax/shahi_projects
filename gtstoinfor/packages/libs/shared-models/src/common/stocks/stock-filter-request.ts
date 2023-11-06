

export class StockFilterRequest{
    m3ItemCode?:string;
    itemType?: number
    location?: number
    plant?: number
    
    constructor( m3ItemCode?:string, itemType?: number, location?: number, plant?: number){
        this.m3ItemCode = m3ItemCode;
        this.itemType = itemType
        this.location = location
        this.plant = plant
    }
}
