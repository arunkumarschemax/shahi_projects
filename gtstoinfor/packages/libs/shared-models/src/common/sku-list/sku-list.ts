export class SKUlistFilterRequest{
    itemNoId?:number;
    sizeId?:number;
    colourId?:number;
    destinationsId?:number;
    constructor(itemNoId?:number){
        this.itemNoId = itemNoId;
        this.colourId=this.colourId;
        this.sizeId=this.sizeId;
        this.destinationsId=this.destinationsId;
    }
}