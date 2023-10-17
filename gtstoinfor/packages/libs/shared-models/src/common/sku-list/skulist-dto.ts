export class SKUListDto{
    itemskuID:number;
    skucode:string;
    sizeId:number;
    size:string;
    colourId:number;
    colour:string;
    destinationsId:number;
    destinations:string;

    constructor(itemskuID:number,skucode:string,sizeId:number,size:string,colourId:number,colour:string,destinationsId:number,destinations:string){
        this.itemskuID=itemskuID;
        this.skucode=skucode;
        this.sizeId=sizeId;
        this.size=size;
        this.colourId=colourId;
        this.colour=colour;
        this.destinationsId=destinationsId;
        this.destinations=destinations;
    }
}