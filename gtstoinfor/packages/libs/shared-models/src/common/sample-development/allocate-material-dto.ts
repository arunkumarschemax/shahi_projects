import { allocateMaterialItems } from "./allocate-material-items-request";

export class Allocatematerial{
    itemType: string;
    sampleOrderId:number
    sampleItemId:number 
    m3ItemId:number
    quantity: number;
    stockId:number
    LocationId:number;
    buyerId:number;
    allocatioQuantity:number
    checkedStatus?:boolean
    issuedQty?:number

//    status: MaterialStatusEnum;
    createdUser: string | null;
    updatedUser: string | null;
    allocatedItems:allocateMaterialItems[]
    toBeProcured:number
    samplingBomId:number
    
    constructor(
        itemType: string,
        sampleOrderId:number,
        sampleItemId:number ,
        m3ItemId:number,
         quantity: number,
        stockId:number,
        LocationId:number,
        buyerId:number,
        allocatioQuantity:number,
        allocatedItems:allocateMaterialItems[],
        toBeProcured:number,
        samplingBomId:number,
        checkedStatus?:boolean,
        issuedQty?:number,
    //    status: MaterialStatusEnumnumber,
        createdUser?: string ,
        updatedUser?: string ,

    ){
        this.itemType=itemType
        this.sampleOrderId=sampleOrderId
        this.sampleItemId=sampleItemId
        this.m3ItemId=m3ItemId
        this.quantity=quantity
        this.stockId=stockId
        this.LocationId=LocationId
        this.buyerId = buyerId
        this.allocatioQuantity=allocatioQuantity
        this.checkedStatus=checkedStatus
        this.issuedQty=issuedQty
        this.createdUser=createdUser
        this.updatedUser=updatedUser
        this.allocatedItems = allocatedItems
        this.toBeProcured = toBeProcured
        this.samplingBomId = samplingBomId



    }



}