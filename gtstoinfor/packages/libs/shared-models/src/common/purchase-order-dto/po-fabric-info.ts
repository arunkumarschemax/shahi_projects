    export class PurchaseOrderFbricDto{
    poFabricId:number
    colourId:number
    productGroupId:number
    remarks : string
    fabricTypeId:number
    m3FabricCode:string
    shahiFabricCode:string
    content:string
    weaveId:number
    weight:number
    width:number
    construction:number
    yarnCount:number
    finish:string
    shrinkage:string
    pch:number
    moq:string
    createdAt: string
    createdUser: string | null;
    updatedAt: string;
    updatedUser: string | null;
    versionFlag: number;
    isActive: boolean;
    yarnUom:number
    indentFabricId:number
    poQuantity:string
   quantityUomId:number
    constructor(
    colourId:number,
       remarks : string,
       fabricTypeId:number,
       m3FabricCode:string,
       shahiFabricCode:string,
       content:string,
       weaveId:number,
       weight:number,
       width:number,
       construction:number,
       yarnCount:number,
       finish:string,
       shrinkage:string,
       pch:number,
       moq:string,
       yarnUom:number,
       indentFabricId:number,
       poQuantity:string,
     quantityUomId:number

     ){
        this.colourId=colourId
        this.remarks=remarks
        this.fabricTypeId=fabricTypeId
        this.m3FabricCode=m3FabricCode
        this.shahiFabricCode=shahiFabricCode
        this.content=content
        this.weaveId=weaveId
        this.weight=weight
        this.width=width
        this.construction=construction
        this.yarnCount=yarnCount
        this.finish=finish
        this.shrinkage=shrinkage
        this.pch=pch
        this.moq=moq
        this.yarnUom=yarnUom
        this.indentFabricId=indentFabricId
        this.poQuantity=poQuantity
        this,quantityUomId=quantityUomId
     }
    }