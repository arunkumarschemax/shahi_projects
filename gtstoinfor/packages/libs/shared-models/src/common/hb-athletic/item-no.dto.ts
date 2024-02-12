export class ItemNoDto {

    id: string;
    itemNo?: string;
    custPo?: string;


    constructor(
        id: string, itemNo?: string, custPo?: string,

    ) {

        this.id = id;
        this.itemNo = itemNo;
        this.custPo = custPo;
    }
}