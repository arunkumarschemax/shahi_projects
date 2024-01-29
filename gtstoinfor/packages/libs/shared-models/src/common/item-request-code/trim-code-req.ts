import { ItemTypeEnum, MaterialFabricEnum } from "../../enum"

export class TrimCodeReq{
    buyerId?:number
    trimType?: ItemTypeEnum
    status?: any

    constructor(
        buyerId?:number,
        trimType?: ItemTypeEnum,
        status?: any
    ){
        this.buyerId = buyerId
        this.trimType = trimType
        this.status = status
    }
}