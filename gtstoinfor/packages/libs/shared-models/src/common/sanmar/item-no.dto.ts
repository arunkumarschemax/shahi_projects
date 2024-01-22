export class ItemNoDto {

    id: string;
    itemNo?: string;


    constructor(
        id: string, itemNo?: string

    ) {

        this.id = id;
        this.itemNo = itemNo;
    }
}
