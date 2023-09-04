export class ItemInfo {
    // sizeId : number
    itemCode : string
    description : string

    constructor(itemCode:string, description:string){
        this.itemCode = itemCode
        this.description = description
    }
}