
export class PoOrderFilter {
    poNumber?: string;
    externalRefNo?:string
    season?:string
    material?:string
    

    constructor(poNumber?: string, externalRefNo?:string,season?:string,material?:string){
            this.poNumber= poNumber;
            this.externalRefNo = externalRefNo
            this.season = season
            this.material = material
    }
}