import { PropertyEnum, SubContractStatus } from "../../enum";

export class ItemCreationDTO{
    itemName: string;
    itemCode: string;
    description: string;
    itemTypeId: number;
    brandId: number;
    categoryId: number;
    category: string;
    subCategoryId: number;
    season: string;
    responsiblePersonId: number;
    productDesignerId: number;
    approver: number;
    productionMerchant: number;
    pdMerchant: number;
    factoryMerchant: number;
    salePersonId: number;
    styleNo: string;
    internalStyleId: number;
    property:PropertyEnum;
    uom: string;
    altUoms: string;
    currency: string;
    targetCurrency: string;
    conversionFactor: string;
    projectionOrder: string;
    buyingHouseCommision: number;
    salePriceQty: number;
    licenseId: number;
    customGroupId: number;
    nationalDbk: number;
    roslGroup: number;
    isSubContract: SubContractStatus;
    salePrice: number;
    orderConfirmedDate: Date;
    firstExFactoryDate: Date;
    orderCloseDate: Date;
    moq: number;
    orderQty: number;
    facilityId: number;
    itemGroup: string;
    productGroup: string;
    businessArea: string;
    basicUom: string;
    groupTechClass: string;
    composition: string;
    range: string;
    noOfLacePanel: string;
    searchGroup: number;
    reference: string;
    isActive: boolean;
    createdUser: string;
    createdAt:Date;
    updatedAt:Date;
    updatedUser: string;
    versionFlag: number;
    fgitemId?:number;
    constructor(itemName: string,itemCode: string,description: string,itemTypeId: number,brandId: number,categoryId: number,category:string, subCategoryId: number,season: string,responsiblePersonId: number,property:PropertyEnum,productDesignerId: number,approver: number,productionMerchant: number,pdMerchant: number,factoryMerchant: number,salePersonId: number,styleNo: string,internalStyleId: number,uom: string,altUoms: string,currency: string,targetCurrency: string,conversionFactor: string,projectionOrder: string,buyingHouseCommision: number,salePriceQty: number,licenseId: number,customGroupId: number,nationalDbk: number,roslGroup: number,isSubContract: SubContractStatus,salePrice: number,orderConfirmedDate: Date,firstExFactoryDate: Date,orderCloseDate: Date,moq: number,orderQty: number,facilityId: number,itemGroup: string,productGroup: string,businessArea: string,basicUom: string,groupTechClass: string,composition: string,range: string,noOfLacePanel: string,searchGroup: number,reference: string,isActive: boolean,createdUser: string,createdAt:Date,updatedAt:Date,updatedUser: string,versionFlag: number,fgitemId?:number){
        this.itemName=itemName;
        this.itemCode=itemCode;
        this.description=description;
        this.itemTypeId=itemTypeId;
        this.brandId=brandId;
        this.categoryId=categoryId;
        this.category = category
        this.subCategoryId=subCategoryId;
        this.season=season;
        this.responsiblePersonId=responsiblePersonId;
        this.productDesignerId=productDesignerId;
        this.approver=approver;
        this.productionMerchant=productionMerchant;
        this.pdMerchant=pdMerchant;
        this.factoryMerchant=factoryMerchant;
        this.salePersonId=salePersonId;
        this.styleNo=styleNo;
        this.internalStyleId=internalStyleId;
        this.property=property;
        this.uom=uom;
        this.altUoms=altUoms;
        this.currency=currency;
        this.targetCurrency=targetCurrency;
        this.conversionFactor=conversionFactor;
        this.projectionOrder=projectionOrder;
        this.buyingHouseCommision=buyingHouseCommision;
        this.salePriceQty=salePriceQty;
        this.licenseId=licenseId;
        this.customGroupId=customGroupId;
        this.nationalDbk=nationalDbk;
        this.roslGroup=roslGroup;
        this.isSubContract=isSubContract;
        this.salePrice=salePrice;
        this.orderConfirmedDate=orderConfirmedDate;
        this.firstExFactoryDate=firstExFactoryDate;
        this.orderCloseDate=orderCloseDate;
        this.moq=moq;
        this.orderQty=orderQty;
        this.facilityId=facilityId;
        this.itemGroup = itemGroup;
        this.productGroup = productGroup;
        this.businessArea = businessArea;
        this.basicUom = basicUom;
        this.groupTechClass = groupTechClass;
        this.composition = composition;
        this.range = range;
        this.noOfLacePanel = noOfLacePanel;
        this.searchGroup = searchGroup;
        this.reference = reference;
        this.isActive=isActive;
        this.createdUser=createdUser;
        this.updatedUser=updatedUser;
        this.versionFlag=versionFlag;
        this.fgitemId = fgitemId;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
    }
}