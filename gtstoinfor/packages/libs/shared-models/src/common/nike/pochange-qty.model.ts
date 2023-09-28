export class PoChangeSizeModel {
    sizeDescription: string;
    oldQuantity:number;
    newQuantity:number;
    difference:number;
 

    constructor(sizeDescription: string, oldQuantity:number,
        newQuantity:number,
        difference:number,
    ) {
        this.sizeDescription = sizeDescription
        this.oldQuantity = oldQuantity
        this.newQuantity = newQuantity
        this.difference = difference
        
    }
}