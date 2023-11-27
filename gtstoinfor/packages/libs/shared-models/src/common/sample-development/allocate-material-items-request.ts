export class allocateMaterialItems{
    materialAllocationItemsId: number;
    quantity: number;
    stockId:number
    LocationId:number
    allocatioQuantity:number
    materialAllocationId:number
    createdUser?: string | null;
    updatedUser?: string | null;
    constructor(
        materialAllocationItemsId: number,
         quantity: number,
        stockId:number,
        LocationId:number,
        allocatioQuantity:number,
        materialAllocationId:number,
        createdUser?: string ,
        updatedUser?: string ,
    ){
        this.materialAllocationItemsId = materialAllocationItemsId
        this.quantity=quantity
        this.stockId=stockId
        this.LocationId=LocationId
        this.allocatioQuantity=allocatioQuantity
        this.materialAllocationId = materialAllocationId
        this.createdUser=createdUser
        this.updatedUser=updatedUser

    }

}




