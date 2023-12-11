
export class PoOrderFilter {
    poNumber?: string;
    externalRefNo?:string
    

    constructor(poNumber?: string, externalRefNo?:string){
            this.poNumber= poNumber;
            this.externalRefNo = externalRefNo
    }
}