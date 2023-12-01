

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

export class StockupdateRequest{
    stockId?:string;
    allocateQuantity?: number
   
    
    constructor( stockId?:string, allocateQuantity?: number){
        this.stockId = stockId;
        this.allocateQuantity = allocateQuantity
      
}

}