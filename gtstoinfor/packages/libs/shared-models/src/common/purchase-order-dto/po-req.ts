export class PoReq{
    poId?: Number
    materialType?: string
    poAgainst?: string
    ETDfromDate?:Date
    ETDtoDate?:Date
    PoFromDate?:Date
    PoToDate?:Date
    tab?:string
    extRefNo?:string;
    constructor( poId?:Number,materialType?: string,poAgainst?: string,ETDtoDate?:Date,ETDfromDate?:Date,PoFromDate?:Date,
        PoToDate?:Date,tab?:string,extRefNo?:string){
        this.poId = poId
        this.materialType = materialType
        this.poAgainst = poAgainst
        this.ETDfromDate = ETDfromDate
        this.PoFromDate = PoFromDate
        this.PoToDate = PoToDate
        this.ETDtoDate =ETDtoDate
        this.tab = tab
        this.extRefNo = extRefNo
    }
}