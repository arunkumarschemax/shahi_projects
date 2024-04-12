

export class HbCompareModel {
   
    custPo: string;
    style:number;
    color:string;
    size:string;
    oldPrice: string;
    newPrice: string;
    oldDeliveryDate: string;
    newDelieveryDate: string;
    oldQuantity: string;
    newQuantity: string;
    
    constructor (custPo: string, style:number,color:string,size:string,
        oldPrice: string,
        newPrice: string,
        oldDeliveryDate: string,
        newDelieveryDate: string,
        oldQuantity: string,
        newQuantity: string,){

            this.custPo = custPo
            this.style = style
            this.color = color
            this.size = size
            this.oldPrice = oldPrice
            this.newPrice = newPrice
            this.oldDeliveryDate = oldDeliveryDate
            this.newDelieveryDate = newDelieveryDate
            this.oldQuantity = oldQuantity
            this.newQuantity = newQuantity

    } 

}