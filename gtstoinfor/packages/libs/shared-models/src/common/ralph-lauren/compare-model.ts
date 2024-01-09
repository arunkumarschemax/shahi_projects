import { PoItemVariant } from "./po-item-variant";

export class CompareModel {
   
    poNumber: string;
    poItem:number;
    size:string;
    oldPrice: string;
    newPrice: string;
    oldDeliveryDate: string;
    newDelieveryDate: string;
    oldQuantity: number;
    newQuantity: number;
    
    constructor (poNumber: string, poItem:number,size:string,
        oldPrice: string,
        newPrice: string,
        oldDeliveryDate: string,
        newDelieveryDate: string,
        oldQuantity: number,
        newQuantity: number,){

            this.poNumber = poNumber
            this.poItem = poItem
            this.size = size
            this.oldPrice = oldPrice
            this.newPrice = newPrice
            this.oldDeliveryDate = oldDeliveryDate
            this.newDelieveryDate = newDelieveryDate
            this.oldQuantity = oldQuantity
            this.newQuantity = newQuantity

    } 

}