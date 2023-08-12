export class SettingsModel{
    settingsId: number;
    accountControlId: number;
    pchId:number;
    companyId:number;
    facilityId:number;
    divisionId:number;
    warehouseId:number;
    coTypeId:number;
    currencyId:number;
    licencetypeId:number;
    discount:number;
    salesPersonId:number;
    fabricResponsibleId:number;
    itemResponsibleId:number;
    trimResponsibleId:number;
    buyerAddress:number;
    buyerGroup:string;
    agent : number;
    packageTerms: number;
    paymentMethod:number;
    paymentTerms:number;
    deliveryMethod:number;
    deliveryTerms:number;
    isActive : boolean;
    versionFlag: number;

    constructor(settingsId: number,accountControlId: number,pchId:number,companyId:number,facilityId:number,divisionId:number,warehouseId:number,coTypeId:number,currencyId:number,licencetypeId:number,discount:number,salesPersonId:number,fabricResponsibleId:number,itemResponsibleId:number,trimResponsibleId:number,buyerAddress:number,buyerGroup:string,agent : number,packageTerms: number,paymentMethod:number,paymentTerms:number,deliveryMethod:number,deliveryTerms:number,isActive : boolean,versionFlag: number){
        this.settingsId = settingsId;
        this.accountControlId = accountControlId;
        this.pchId = pchId;
        this.companyId = companyId;
        this.facilityId = facilityId;
        this.divisionId = divisionId;
        this.warehouseId = warehouseId;
        this.coTypeId = coTypeId;
        this.currencyId = currencyId;
        this.licencetypeId = licencetypeId;
        this.discount= discount;
        this.salesPersonId = salesPersonId;
        this.fabricResponsibleId = fabricResponsibleId;
        this.itemResponsibleId = itemResponsibleId;
        this.trimResponsibleId = trimResponsibleId;
        this.buyerAddress = buyerAddress;
        this.buyerGroup = buyerGroup;
        this.agent = agent;
        this.packageTerms = packageTerms;
        this.paymentMethod = paymentMethod;
        this.paymentTerms = paymentTerms;
        this.deliveryMethod = deliveryMethod;
        this.deliveryTerms = deliveryTerms;
        this.isActive = isActive;
        this.versionFlag = versionFlag;
    }


}