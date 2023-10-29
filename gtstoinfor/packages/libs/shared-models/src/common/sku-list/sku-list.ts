export class SKUlistFilterRequest{
    itemNoId?:number;
    itemsCode?:string;
    sizeId?:number;
    size?:string;
    colourId?:number;
    colour?:string;
    destinationsId?:number;
    destinations?:string;

    constructor(itemNoId?:number,itemsCode?:string,sizeId?:number,size?:string,colour?:string,destinations?:string,colourId?:number,destinationsId?:number){
        this.itemNoId = itemNoId;
        this.itemsCode=itemsCode;
        this.colourId=colourId;
        this.colour = colour;
        this.size=size;
        this.sizeId=sizeId;
        this.destinationsId=destinationsId;
        this.destinations=destinations;
    }
}