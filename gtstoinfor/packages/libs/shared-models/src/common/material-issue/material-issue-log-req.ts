

export class MaterialIssueLogrequest{
    
    materialIssueLogId:number;
 
    materialAllocationId:number;
    
    itemType:string;
  
    sampleOrderId:number
  
    sampleItemId:number
 
    m3ItemId:number
 
    quantity: number;
    stockId:number 
    locationId:number
 
    location:string
 
    allocateQuantity:number

    buyerId:number

    buyer:string

   requestNo:string;

   constructor(
    materialIssueLogId:number,
 
    materialAllocationId:number,
    
    itemType:string,
  
    sampleOrderId:number,
  
    sampleItemId:number,
 
    m3ItemId:number,
 
    quantity: number,
    stockId:number, 
    locationId:number,
 
    location:string,
 
    allocateQuantity:number,

    buyerId:number,

    buyer:string,

   requestNo:string,
){
    this.materialIssueLogId = materialIssueLogId
    this.materialAllocationId = materialAllocationId
    this.itemType = itemType
    this.sampleOrderId = sampleOrderId
    this.sampleItemId = sampleItemId
    this.m3ItemId = m3ItemId
    this.quantity = quantity
    this.stockId = stockId
    this.locationId = locationId
    this.location = location
    this.allocateQuantity = allocateQuantity
    this.buyerId = buyerId
    this.buyer = buyer
    this.requestNo = requestNo
}

    

   
}