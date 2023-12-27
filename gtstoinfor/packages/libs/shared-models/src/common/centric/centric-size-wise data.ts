export class CentricSizeWiseModel {
  
    size: string;
    fobPrice: number;
    totalQuantity:number;
    specialInstruction:string;
    upc:string;
    retailPrice:number;
    color:string;
    ratio?:string;
    ppkUpc?:string;
    label?:string;
    exfactory?:string;
    exportDate?:string;
    deliveryDate?:string



   

    constructor(
    size: string,
    fobPrice: number,
    totalQuantity:number,
    specialInstruction:string,
    upc:string,
    retailPrice:number,
    color:string,
    ratio?:string,
    ppkUpc?:string,
    label?:string,
    exfactory?:string,
    exportDate?:string,
    deliveryDate?:string,
    

   
    ) {
       
        this.size = size
        this.fobPrice = fobPrice
        this.totalQuantity = totalQuantity
        this.specialInstruction = specialInstruction
        this.upc = upc
        this.retailPrice = retailPrice
        this.color = color
        this.ratio = ratio
        this.ppkUpc = ppkUpc
        this.label = label
        this.exfactory = exfactory
        this.exportDate = exportDate
        this.deliveryDate = deliveryDate
       
    };
}