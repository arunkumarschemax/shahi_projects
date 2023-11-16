import { IsImportedItemEnum, PropertyEnum } from "../../enum";


export class RmCreationDTO{
    rmitemId:string;
    itemCode:string;
    itemCategoryId:number;
    pchId:number;
    facilityID:number;
    genericCode:string;
    structure:string;
    quality:string;
    itemName:string;
    itemIypeId:number;
    placement:string;
    fabricFinishId:number;
    responsibleId:number;
    devResponsible:string;
    basicUomId:number;
    altUomId:number;
    multiplicationFactor:string;
    currencyId:number;
    isImportedItem:IsImportedItemEnum;
    price:string;
    tax:string;
    supplyLeadTime:string;
    supplier:string;
    consumption:string;
    total:number;
    deliveryTerms:string;
    deliveryMethod:string;
    purchasePriceQty:string;
    saleTax:string;
    exciseDuty:string;
    licenseId:number;
    property:PropertyEnum;
    saleItem:string;
    wastage:string;
    costGroup:string;
    remarks:string;
    itemGroupId:number;
    procurementGroupId:number;
    productGroupId:number;
    hierarchyLevelId:number;
    businessArea:number;
    planner:string;
    attachedWareHouse:string;
    useInOperation:string;
    isActive: boolean;
    createdUser: string;
    updatedUser: string;
    versionFlag: number;
    orderMultipleBuom?: string;
    moq?: string;
    orderMultipleAuom?: string;
    description?:string
    constructor(rmitemId:string,itemCode:string,itemCategoryId:number, pchId:number,facilityID:number,genericCode:string,structure:string,quality:string,itemName:string,itemIypeId:number,placement:string, fabricFinishId:number,responsibleId:number,devResponsible:string, basicUomId:number,altUomId:number,multiplicationFactor:string,currencyId:number,price:string,tax:string,purchasePriceQty:string,saleTax:string,exciseDuty:string,licenseId:number,property:PropertyEnum,saleItem:string,wastage:string, costGroup:string, remarks:string,deliveryTerms:string,deliveryMethod:string,itemGroupId:number,procurementGroupId:number,productGroupId:number,
          hierarchyLevelId:number,isImportedItem:IsImportedItemEnum,businessArea:number,planner:string,attachedWareHouse:string,supplyLeadTime:string,supplier:string,consumption:string, total:number,useInOperation:string,isActive: boolean,createdUser: string,updatedUser: string,versionFlag: number, orderMultipleBuom?: string,moq?: string,orderMultipleAuom?: string,description?:string){
        this.rmitemId=rmitemId;
        this.itemCode=itemCode;
        this.itemCategoryId=itemCategoryId;
        this.pchId=pchId;
        this.facilityID=facilityID;
        this.genericCode=genericCode;
        this.structure=structure;
        this.quality=quality;
        this.itemName=itemName;
        this.itemIypeId=itemIypeId;
        this.placement=placement;
        this.fabricFinishId=fabricFinishId;
        this.responsibleId=responsibleId;
        this.devResponsible=devResponsible;
        this.basicUomId=basicUomId;
        this.altUomId=altUomId;
        this.multiplicationFactor=multiplicationFactor;
        this.currencyId=currencyId;
        this.price=price;
        this.tax=tax;
        this.purchasePriceQty=purchasePriceQty;
        this.saleTax=saleTax;
        this.exciseDuty=exciseDuty;
        this.licenseId=licenseId;
        this.property=property;
        this.isImportedItem=isImportedItem;
        this.saleItem=saleItem;
        this.wastage=wastage;
        this.procurementGroupId=procurementGroupId;
        this.productGroupId=productGroupId;
        this.attachedWareHouse=attachedWareHouse;
        this.planner=planner;
        this.hierarchyLevelId=hierarchyLevelId;
        this.businessArea=businessArea;
        this.costGroup=costGroup;
        this.supplyLeadTime=supplyLeadTime;
        this.supplier=supplier;
        this.consumption=consumption;
        this.total=total;
        this.deliveryTerms=deliveryTerms;
        this.deliveryMethod=deliveryMethod
        this.remarks=remarks;
        this.itemGroupId=itemGroupId;
        this.useInOperation=useInOperation;
        this.isActive=isActive;
        this.createdUser=createdUser;
        this.updatedUser=updatedUser;
        this.versionFlag=versionFlag;
        this.orderMultipleAuom = orderMultipleAuom
        this.orderMultipleBuom = orderMultipleBuom
        this.moq = moq
        this.description = description
    }
}