export class M3KnittedFabricsDTO {
    m3ItemsId: number;
    kniteContent: number;
    kniteDescription: string;
    kniteRemarks: string;
    kniteGauze: string;
    kniteYarnCount: string;
    kniteHsn: string;
    kniteM3Code: string;
    knitWeight: string;
    knitType: string;
    knittedFabricTypeId: number;
    knittedBuyerId: number;
    isActive: boolean;
    createdUser: string;
    updatedUser: string;
    versionFlag: number;
    knitBuyerCode: string;
    constructor(m3ItemsId: number,kniteContent: number,kniteDescription: string,kniteRemarks: string,kniteGauze: string,kniteYarnCount: string,kniteHsn: string,kniteM3Code: string,knitWeight: string,knitType: string,knittedFabricTypeId: number,knittedBuyerId: number,isActive: boolean,createdUser: string,updatedUser: string,versionFlag: number,knitBuyerCode: string){
        this.m3ItemsId = m3ItemsId;
        this.kniteContent = kniteContent;
        this.kniteDescription = kniteDescription;
        this.kniteRemarks = kniteRemarks;
        this.kniteGauze = kniteGauze;
        this.kniteYarnCount = kniteYarnCount;
        this.kniteHsn = kniteHsn;
        this.kniteM3Code = kniteM3Code;
        this.knitWeight = knitWeight;
        this.knitType = knitType;
        this.knittedFabricTypeId = knittedFabricTypeId;
        this.knittedBuyerId = knittedBuyerId;
        this.isActive = isActive;
        this.createdUser = createdUser;
        this.updatedUser = updatedUser;
        this.versionFlag = versionFlag;
        this.knitBuyerCode = knitBuyerCode;
    }
}

