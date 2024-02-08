export class ItemNoDto {
    id: string;
    itemNo?: string;
    poNumber?:string
    poLine?:string
    constructor(
      id: string,
      itemNo?: string,
      poNumber?:string,
      poLine?:string

    ) {
      this.id = id,
        this.itemNo = itemNo;
        this.poNumber = poNumber
        this.poLine = poLine
    }
  }