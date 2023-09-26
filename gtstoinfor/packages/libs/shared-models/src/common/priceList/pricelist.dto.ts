export class PriceListDto {
    id: number;
    style: string;
    year: string;
    destination:string;
    seasonCode:string;
    currency:string;
    price:string;
    item?:string;
    createdUser?: string;
    isActive?:boolean
    versionFlag?: number;
    updatedUser?:string;
    constructor( id:number,style: string, year: string,destination:string,
        seasonCode:string,currency:string,    price:string, item?:string,       createdUser?:string,isActive?:boolean,versionFlag?: number,updatedUser?:string) {
      this.id = id;
      this.style = style;
      this.year = year;
      this.destination = destination;
      this.seasonCode = seasonCode;
      this.currency = currency;
      this.item = item;
      this.createdUser = createdUser;
      this.isActive = isActive;
      this.versionFlag = versionFlag;
      this.updatedUser = updatedUser;
      this.price = price;
    }
  }
  