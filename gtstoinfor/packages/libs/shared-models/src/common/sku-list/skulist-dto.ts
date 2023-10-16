export class SKUListDto{
    itemskuID:number;
    sizeId:number;
    size:string;
    colourId:number;
    colour:string;
    destinationsId:number;
    destinations:string;

    constructor(itemskuID:number,sizeId:number,size:string,colourId:number,colour:string,destinationsId:number,destinations:string){
        this.itemskuID=itemskuID;
        this.sizeId=sizeId;
        this.size=size;
        this.colourId=colourId;
        this.colour=colour;
        this.destinationsId=destinationsId;
        this.destinations=destinations;
    }
}