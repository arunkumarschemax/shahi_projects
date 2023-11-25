export class Allocatematerial{
    materialAllocationId: number;
    itemType: string;
    sampleOrderId:number
    sampleItemId:number 
    m3ItemId:number
     quantity: number;
    stockId:number
    LocationId:number
    allocatioQuantity:number
//    status: MaterialStatusEnum;
    createdUser: string | null;
    updatedUser: string | null;
    constructor(
        materialAllocationId: number,
        itemType: string,
        sampleOrderId:number,
        sampleItemId:number ,
        m3ItemId:number,
         quantity: number,
        stockId:number,
        LocationId:number,
        allocatioQuantity:number,
    //    status: MaterialStatusEnumnumber,
        createdUser?: string ,
        updatedUser?: string ,
    ){
        this.materialAllocationId=materialAllocationId
        this.itemType=itemType
        this.sampleOrderId=sampleOrderId
        this.sampleItemId=sampleItemId
        this.m3ItemId=m3ItemId
        this.quantity=quantity
        this.stockId=stockId
        this.LocationId=LocationId
        this.allocatioQuantity=allocatioQuantity
        this.createdUser=createdUser
        this.updatedUser=updatedUser

    }



}