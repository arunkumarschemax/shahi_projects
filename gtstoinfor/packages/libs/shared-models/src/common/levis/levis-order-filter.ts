export class LevisOrderFilter {
    poNumber?: string;
    splitPo?: string;
    totalQuantity:string;
    splitPoTotalQuantity?: string;
    style?: string
    color?: string
    deliveryDateStartDate?: any
    deliveryDateEndDate?: any
    externalRefNo?: string
    itemNo?: string;
    coNumber?: string;




    constructor(poNumber?: string,
        splitPo?: string,
        totalQuantity?:string,
        splitPoTotalQuantity?: string,
        style?: string,
        color?: string,
        deliveryDateStartDate?: any,
        deliveryDateEndDate?: any,
        externalRefNo?: string,
        itemNo?: string,
        coNumber?: string,

    ) {
        this.poNumber = poNumber;
        this.splitPo = splitPo;
        this.totalQuantity = totalQuantity;
        this.splitPoTotalQuantity = splitPoTotalQuantity;
        this.color = color
        this.style = style
        this.deliveryDateEndDate = deliveryDateEndDate
        this.deliveryDateStartDate = deliveryDateStartDate
        this.externalRefNo = externalRefNo
        this.itemNo = itemNo
        this.coNumber = coNumber


    }
}