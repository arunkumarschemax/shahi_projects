import { MaterialStatusEnum } from "../../enum";
import { allocateMaterialItems } from "./allocate-material-items-request";

export class AllocateMaterial{
    materialAllocationId:number;
    itemType: string;
    sampleOrderId:number
    sampleItemId:number 
    m3ItemId:number
    buyerId:number
    status: MaterialStatusEnum;
    materialAllocateIteminfo:allocateMaterialItems[];
    buyerName:string
    createdUser?: string | null;
    updatedUser?: string | null;
    constructor(
        materialAllocationId:number,
        itemType: string,
        sampleOrderId:number,
        sampleItemId:number ,
        m3ItemId:number,
        buyerId:number,
         status: MaterialStatusEnum,
         materialAllocateIteminfo:allocateMaterialItems[],
         buyerName:string,
        createdUser?: string ,
        updatedUser?: string ,
    ){
        this.materialAllocationId = materialAllocationId
        this.itemType=itemType
        this.sampleOrderId=sampleOrderId
        this.sampleItemId=sampleItemId
        this.m3ItemId=m3ItemId
        this.buyerId = buyerId
        this.status = status
        this.materialAllocateIteminfo = materialAllocateIteminfo
        this.buyerName = buyerName
        this.createdUser=createdUser
        this.updatedUser=updatedUser

    }



}
