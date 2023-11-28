    export class PurchaseOrderFbricDto{
   indentFabricId:number
  sampleReqFabricId:number
    poFabricId:number
    colourId:number
    remarks : string
    m3FabricCode:string
    createdAt: string
    createdUser: string | null;
    poAgainstId:String
    poQuantity:number
    quantityUomId:number
    constructor(
      indentFabricId:number,
      sampleReqFabricId:number,
       colourId:number,
       remarks : string,
        m3FabricCode:string,
       poQuantity:number,
       quantityUomId:number

     ){
        this.indentFabricId=indentFabricId
        this.sampleReqFabricId=sampleReqFabricId
        this.remarks=remarks
        this.m3FabricCode=m3FabricCode
         this.colourId=colourId
        this.poQuantity=poQuantity
        this.quantityUomId=quantityUomId
     }
    }