
export class HbPoOrderFilter {
    custPo?: string;
    style?:string
    color?:string
    deliveryDateStartDate?:any
    deliveryDateEndDate?:any



    constructor(custPo?: string,style?:string,
        color?:string,
        deliveryDateStartDate?:any,
        deliveryDateEndDate?:any
    ) {
        this.custPo = custPo;
        this.color = color
        this.style = style
        this.deliveryDateEndDate = deliveryDateEndDate
        this.deliveryDateStartDate = deliveryDateStartDate
        

    }
}