
export class HbPoOrderFilter {
    custPo?: string;
    style?:string
    color?:string
    deliveryDateStartDate?:any
    deliveryDateEndDate?:any
    externalRefNo?:string



    constructor(custPo?: string,style?:string,
        color?:string,
        deliveryDateStartDate?:any,
        deliveryDateEndDate?:any,
        externalRefNo?:string
    ) {
        this.custPo = custPo;
        this.color = color
        this.style = style
        this.deliveryDateEndDate = deliveryDateEndDate
        this.deliveryDateStartDate = deliveryDateStartDate
        this.externalRefNo = externalRefNo
        
    
    }
}