import { LogoEnum, PartEnum } from "../../enum"

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
colorId?:number;
logo?:LogoEnum;
part?:PartEnum;
qualityId?:number;
structureId?:number;
thicknessId?:number;
uomId?:number;
varietyId?:number;
trimBuyerId?: number
lengthId?: number
lineId?: number
partsId?: number
plyId?: number
shapeId?: number
sliderId?: number
trimSizeId?: number


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
    trimMapId?: any,
    colorId?:number,
    logo?:LogoEnum,
    part?:PartEnum,
    qualityId?:number,
    structureId?:number,
    thicknessId?:number,
    uomId?:number,
    varietyId?:number,
    trimBuyerId?: number,
    lengthId?: number,
    lineId?: number,
    partsId?: number,
    plyId?: number,
    shapeId?: number,
    sliderId?: number,
    trimSizeId?: number

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
    this.colorId = colorId
    this.logo = logo
    this.part =  part
    this.qualityId = qualityId
    this.structureId = structureId
    this.thicknessId = thicknessId
    this.uomId = uomId
    this.varietyId = varietyId
    this.trimBuyerId = trimBuyerId
    this.lengthId = lengthId
    this.lineId = lineId
    this.partsId = partsId
    this.plyId = plyId
    this.shapeId = shapeId
    this.sliderId = sliderId
    this.trimSizeId = trimSizeId
}


}