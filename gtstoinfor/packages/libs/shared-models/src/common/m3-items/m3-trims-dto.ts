import { execFile } from "child_process";
import { ItemTypeEnum, LogoEnum, PartEnum, m3ItemsContentEnum } from "../../enum";

export class M3trimsDTO {
    m3ItemsId:number;
    buyerId:number;
    itemCode:string;
    categoryId:number;
    colorId:number;
    contentId:number;
    finishId:number;
    holeId:number;
    logo:LogoEnum;
    part:PartEnum;
    qualityId:number;
    structureId:number;
    thicknessId:number;
    typeId:number;
    uomId:number;
    varietyId:number;
    trimCategoryId:number;
    trimMappingId:number;
    buyerCode?:string
    trimType?: ItemTypeEnum
    description?: string
    extRefNumber?: string
    itemType?: string
    m3Code?:string
    hsnCode?:string
    trimBuyerId?: number
    lengthId?: number
    lineId?: number
    partsId?: number
    plyId?: number
    shapeId?: number
    sliderId?: number
    trimSizeId?: number

    constructor(m3ItemsId:number,buyerId:number,
        itemCode:string,
        categoryId:number,
        colorId:number,
        contentId:number,
        finishId:number,
        holeId:number,
        logo:LogoEnum,
        part:PartEnum,
        qualityId:number,
        structureId:number,
        thicknessId:number,
        typeId:number,
        uomId:number,
        varietyId:number,
        trimCategoryId:number,
        trimMappingId:number,
        buyerCode?: string,
        trimType?:ItemTypeEnum,
        description?: string,
        extRefNumber?: string,
        itemType?: string,
        m3Code?:string,
        hsnCode?:string,
        trimBuyerId?: number,
        lengthId?: number,
        lineId?: number,
        partsId?: number,
        plyId?: number,
        shapeId?: number,
        sliderId?: number,
        trimSizeId?: number
    
    ) {
        this.m3ItemsId=m3ItemsId;
        this.buyerId=buyerId;
        this.itemCode=itemCode;
        this.categoryId=categoryId;
        this.colorId=colorId;
        this.contentId=contentId;
        this.finishId=finishId;
        this.holeId=holeId;
        this.logo=logo;
        this.part=part;
        this.qualityId=qualityId;
        this.structureId=structureId;
        this.thicknessId=thicknessId;
        this.typeId=typeId;
        this.uomId=uomId;
        this.varietyId=varietyId;
        this.trimCategoryId=trimCategoryId;
        this.trimMappingId=trimMappingId;
        this.buyerCode = buyerCode
        this.trimType = trimType
        this.description = description
        this.extRefNumber = extRefNumber
        this.itemType = itemType
        this.m3Code = m3Code
        this.hsnCode = hsnCode
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



export class M3TrimType {
    trimType: string
    buyerId?:number
    constructor(trimType: string, buyerId: number){
        this.trimType = trimType
        this.buyerId = buyerId
    }
}