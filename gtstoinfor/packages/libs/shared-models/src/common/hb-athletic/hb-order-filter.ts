
export class HbPoOrderFilter {
    custPo?: string;
    externalRefNo?:string



    constructor(custPo?: string, externalRefNo?:string) {
        this.custPo = custPo;
        this.externalRefNo = externalRefNo

    }
}