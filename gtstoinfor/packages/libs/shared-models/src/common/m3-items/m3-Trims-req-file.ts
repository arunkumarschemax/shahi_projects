export class M3TrimFilterReq{ 
buyerId:number
trimCategory:number
trimType:string
categoryId:number
contentId:number
finishId:number
holeId:number
hsnCode:string
m3Code:string
typeId:number
trimMapId?: any 


constructor(
    buyerId?:number,
    trimCategory?:number,
    trimType?:string,
    categoryId?:number,
    contentId?:number,
    finishId?:number,
    holeId?:number,
    hsnCode?:string,
    m3Code?:string,
    typeId?:number,
    trimMapId?: any 
){
    this.categoryId=categoryId
    this.contentId=contentId
    this.finishId=finishId
    this.holeId=holeId
    this.hsnCode=hsnCode
    this.m3Code=m3Code
    this.typeId=typeId
    this.trimCategory=trimCategory
    this.trimType=trimType
    this.buyerId=buyerId
    this.trimMapId=trimMapId
}


}