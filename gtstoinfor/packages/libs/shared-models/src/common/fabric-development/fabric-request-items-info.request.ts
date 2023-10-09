export class FabricItemInfoRequest {
    
    itemCode : string
    description : string
    fabricRequestItemsId?: number;

    constructor(itemCode:string, description:string,fabricRequestItemsId?:number){
        this.itemCode = itemCode
        this.description = description
        this.fabricRequestItemsId = fabricRequestItemsId
    }
}