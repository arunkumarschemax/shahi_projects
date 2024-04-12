export class coLineRequest {

    buyerPo?: string;
    itemNo?: string;
    orderNo?: string;



    constructor(
        buyerPo?: string, itemNo?: string, orderNo?: string,

    ) {

        this.buyerPo = buyerPo;
        this.itemNo = itemNo;
        this.orderNo = orderNo
    }
}
