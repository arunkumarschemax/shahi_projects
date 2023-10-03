export class PriceListModel {
    id: number;
    sampleCode: string;
    year: string;
    business:string;
    seasonCode:string;
    fobLocalCurrency:string;
    currency:string;
    item:string;
    createdUser?: string;
    isActive?:boolean
    versionFlag?: number;
    updatedUser?:string;
    constructor( id:number,sampleCode: string, year: string,business:string,
        seasonCode:string,fobLocalCurrency:string,currency:string, item:string,createdUser?:string,isActive?:boolean,versionFlag?: number,updatedUser?:string) {
      this.id = id;
      this.sampleCode = sampleCode;
      this.year = year;
      this.business = business;
      this.seasonCode = seasonCode;
      this.fobLocalCurrency = fobLocalCurrency
      this.currency = currency;
      this.item = item;
      this.createdUser = createdUser;
      this.isActive = isActive;
      this.versionFlag = versionFlag;
      this.updatedUser = updatedUser
    }
  }
  