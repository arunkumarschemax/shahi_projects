export class HistoryRequest {
    sampleCode?: string;
    item?: string
    year?: string;
    business?:string;
    seasonCode?:string;
    currency?:string;
    fobLocalCurrency? : number;
    
    constructor( sampleCode?: string, item?: string,year?: string,business?:string,
        seasonCode?:string,currency?:string, fobLocalCurrency?:number) {
      this.sampleCode = sampleCode;
      this.item = item
      this.year = year;
      this.business = business;
      this.seasonCode = seasonCode;
      this.currency = currency;
      this.fobLocalCurrency = fobLocalCurrency
    }
  }
  