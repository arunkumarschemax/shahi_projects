export class ItemNoDto {

    id: string;
    itemNo?: string;
    buyerPo?:string;


    constructor(
        id: string, itemNo?: string,buyerPo?:string,

    ) {

        this.id = id;
        this.itemNo = itemNo;
        this.buyerPo=buyerPo;
    }
}
