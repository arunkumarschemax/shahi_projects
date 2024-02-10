export class EddieItemNoDto {
    id: string;
    itemNo?: string;
    poNumber?:string
    constructor(
      id: string,
      itemNo?: string,
     poNumber?:string,


    ) {
      this.id = id,
        this.itemNo = itemNo;
        this.poNumber = poNumber;
    }
  }