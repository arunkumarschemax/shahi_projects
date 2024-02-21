export class LevisCompareModel{
   
    poNumber: string;
    po_line:number;
    size:string;
    oldPrice: string;
    newPrice: string;
    oldexFactoryDate: string;
    newexFactoryDate: string;
    oldQuantity: number;
    newQuantity: number;
    oldtransMode: string;
    newtransMode: string;
    
    constructor (poNumber: string, po_line:number,size:string,
        oldPrice: string,
        newPrice: string,
        oldexFactoryDate: string,
        newexFactoryDate: string,
        oldQuantity: number,
        newQuantity: number,
        oldtransMode: string,
        newtransMode: string,){

            this.poNumber = poNumber
            this.po_line = po_line
            this.size = size
            this.oldPrice = oldPrice
            this.newPrice = newPrice
            this.oldexFactoryDate = oldexFactoryDate
            this.newexFactoryDate = newexFactoryDate
            this.oldQuantity = oldQuantity
            this.newQuantity = newQuantity
            this.oldtransMode=oldtransMode
            this.newtransMode=newtransMode

    } 

}