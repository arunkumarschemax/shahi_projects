export class PriceListDto {
    id: number;
    sampleCode: string;
    year: string;
    business:string;
    seasonCode:string;
    currency:string;
    fobLocalCurrency:string;
    item?:string;
    createdUser?: string;
    isActive?:boolean
    versionFlag?: number;
    updatedUser?:string;
    version? : number
    constructor( id:number,sampleCode: string, year: string,business:string,
        seasonCode:string,currency:string,    fobLocalCurrency:string, item?:string,       createdUser?:string,isActive?:boolean,versionFlag?: number,updatedUser?:string, version?:number) {
      this.id = id;
      this.sampleCode = sampleCode;
      this.year = year;
      this.business = business;
      this.seasonCode = seasonCode;
      this.currency = currency;
      this.item = item;
      this.createdUser = createdUser;
      this.isActive = isActive;
      this.versionFlag = versionFlag;
      this.updatedUser = updatedUser;
      this.fobLocalCurrency = fobLocalCurrency;
      this.version = version
    }
  }
  