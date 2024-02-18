export class CompareModel {
   
    poNumber: string;
    po_line:number;
    size:string;
    oldPrice: string;
    newPrice: string;
    oldDeliveryDate: string;
    newDelieveryDate: string;
    oldQuantity: number;
    newQuantity: number;
    
    constructor (poNumber: string, po_line:number,size:string,
        oldPrice: string,
        newPrice: string,
        oldDeliveryDate: string,
        newDelieveryDate: string,
        oldQuantity: number,
        newQuantity: number,){

            this.poNumber = poNumber
            this.po_line = po_line
            this.size = size
            this.oldPrice = oldPrice
            this.newPrice = newPrice
            this.oldDeliveryDate = oldDeliveryDate
            this.newDelieveryDate = newDelieveryDate
            this.oldQuantity = oldQuantity
            this.newQuantity = newQuantity

    } 

}