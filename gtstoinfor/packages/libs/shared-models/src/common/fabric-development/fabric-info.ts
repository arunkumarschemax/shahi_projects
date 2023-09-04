import { ItemInfo } from "./items-info"

export class FabricInfo {
    styleNo : string
    color : string
    garmemtQuantity : number
    comsumption:number
    wastage:number
    fabricQuantity:number
    uom:string
    file:Document
    itemsinfo:ItemInfo[]

    constructor(styleNo : string,color : string, garmemtQuantity : number, comsumption:number,wastage:number,fabricQuantity:number, uom:string,file:Document,itemsinfo:ItemInfo[]
    ){
        this.styleNo  = styleNo
        this.color = color
        this.garmemtQuantity = garmemtQuantity
        this.comsumption = comsumption
        this.wastage = wastage
        this.fabricQuantity = fabricQuantity
        this.uom = uom
         this.file = file
         this.itemsinfo = itemsinfo
    }
}