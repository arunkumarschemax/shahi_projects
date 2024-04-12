export class Fobdto {
    id: number;
    planningSeasonCode:string;
    planningSeasonYear: string;
    styleNumber: string;
    colorCode: string;
    sizeDescription: string;
    shahiConfirmedGrossPrice: number;
    shahiConfirmedGrossPriceCurrencyCode: string;  
    createdUser?: string;
    isActive?:boolean;
    updatedUser?:string;
    versionFlag?: number;
    constructor(id: number, planningSeasonCode:string,
        planningSeasonYear: string,
        styleNumber: string,
        colorCode: string,
        sizeDescription: string,
        shahiConfirmedGrossPrice: number,
        shahiConfirmedGrossPriceCurrencyCode: string, createdUser?:string,isActive?:boolean,versionFlag?: number,    updatedUser?:string
        ) {
      this.id = id;
      this.planningSeasonCode = planningSeasonCode;
      this.planningSeasonYear = planningSeasonYear;
      this.styleNumber = styleNumber;
      this.colorCode = colorCode;
      this.sizeDescription =sizeDescription;
      this.shahiConfirmedGrossPrice = shahiConfirmedGrossPrice;
      this.shahiConfirmedGrossPriceCurrencyCode = shahiConfirmedGrossPriceCurrencyCode;
      this.createdUser = createdUser;
      this.isActive = isActive;
      this.versionFlag = versionFlag;
      this.updatedUser = updatedUser
    }
  }
  