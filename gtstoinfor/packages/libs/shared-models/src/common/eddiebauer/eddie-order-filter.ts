export class EddieOrderFilter {
    poNumber?: string;
    style?:string
    color?:string
    deliveryDateStartDate?:any
    deliveryDateEndDate?:any
    externalRefNo?:string
    itemNo?: string;
    coNumber?:string;




    constructor(poNumber?: string,style?:string,
        color?:string,
        deliveryDateStartDate?:any,
        deliveryDateEndDate?:any,
        externalRefNo?:string,
        itemNo?: string,
        coNumber?:string,
      
    ) {
        this.poNumber = poNumber;
        this.color = color
        this.style = style
        this.deliveryDateEndDate = deliveryDateEndDate
        this.deliveryDateStartDate = deliveryDateStartDate
        this.externalRefNo = externalRefNo
        this.itemNo=itemNo
        this.coNumber=coNumber
    
    
    }
}