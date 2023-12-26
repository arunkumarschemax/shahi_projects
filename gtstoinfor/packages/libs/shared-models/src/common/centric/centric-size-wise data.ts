export class CentricSizeWiseModel {
    color:string;
    size: string;
    fobPrice: number;
    totalQuantity:number;
    specialInstruction:string;
    upc:string;
    retailPrice:number;
    ratio?:string;
    ppkUpc?:string;


   

    constructor(
        color:string,
    size: string,
    fobPrice: number,
    totalQuantity:number,
    specialInstruction:string,
    upc:string,
    retailPrice:number,
    ratio?:string,
    ppkUpc?:string,
   
    ) {
        this.color = color
        this.size = size
        this.fobPrice = fobPrice
        this.totalQuantity = totalQuantity
        this.specialInstruction = specialInstruction
        this.upc = upc
        this.retailPrice = retailPrice
        this.ratio = ratio
        this.ppkUpc = ppkUpc
       
    };
}