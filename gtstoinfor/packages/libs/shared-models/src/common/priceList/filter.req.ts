export class NewFilterDto {
    style?: string;
    year?: string;
    destination?:string;
    seasonCode?:string;
    currency?:string;
    
    constructor( style?: string, year?: string,destination?:string,
        seasonCode?:string,currency?:string) {
      this.style = style;
      this.year = year;
      this.destination = destination;
      this.seasonCode = seasonCode;
      this.currency = currency;
      
    }
  }
  