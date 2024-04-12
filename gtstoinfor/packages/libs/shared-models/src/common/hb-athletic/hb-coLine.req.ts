export class hbCoLineRequest {

    custPo?: string;
    itemNo?: string;
    style?: string;



    constructor(
        custPo?: string, itemNo?: string, style?: string,

    ) {

        this.custPo = custPo;
        this.itemNo = itemNo;
        this.style = style
    }
}
