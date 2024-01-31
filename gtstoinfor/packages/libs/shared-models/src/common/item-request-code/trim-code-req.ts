import { ItemTypeEnum, MaterialFabricEnum } from "../../enum"

export class TrimCodeReq{
    buyerId?:number
    trimType?: ItemTypeEnum
    status?: any
    ExternalRefNo?:string

    constructor(
        buyerId?:number,
        trimType?: ItemTypeEnum,
        status?: any,
        ExternalRefNo?:string
    ){
        this.buyerId = buyerId
        this.trimType = trimType
        this.status = status
        this.ExternalRefNo = ExternalRefNo
    }
}