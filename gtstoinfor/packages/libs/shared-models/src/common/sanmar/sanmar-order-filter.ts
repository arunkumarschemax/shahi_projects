export class SanmarOrderFilter {
    buyerPo?: string;
    style?:string
    color?:string
    deliveryDateStartDate?:any
    deliveryDateEndDate?:any
    externalRefNo?:string




    constructor(buyerPo?: string,style?:string,
        color?:string,
        deliveryDateStartDate?:any,
        deliveryDateEndDate?:any,
        externalRefNo?:string,
      
    ) {
        this.buyerPo = buyerPo;
        this.color = color
        this.style = style
        this.deliveryDateEndDate = deliveryDateEndDate
        this.deliveryDateStartDate = deliveryDateStartDate
        this.externalRefNo = externalRefNo
    
    
    }
}